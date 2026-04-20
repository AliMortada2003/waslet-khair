import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import authService from "../services/authService";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { showAlert } from "../helpers/alerts";
import { resetPasswordStorage } from "../helpers/resetPasswordStorage";

const cookies = new Cookies();

// --- 1. Helper Functions (Internal) ---

const saveAuthData = (response, queryClient) => {
    const { token, donor, admin, superAdmin, roles, expireDate } = response;
    const activeUser = donor || admin || superAdmin || response.user || null;

    const cookieOptions = {
        path: "/",
        expires: expireDate ? new Date(expireDate) : undefined,
        secure: window.location.protocol === "https:",
        sameSite: "strict",
    };

    cookies.set("auth_token", token, cookieOptions);
    cookies.set("user_data", activeUser, { path: "/" });
    cookies.set("user_role", roles?.[0] || null, { path: "/" });
    cookies.set("user_roles", roles || [], { path: "/" });

    // تحديث الكاش بتاع التان ستاك كويري فوراً
    queryClient.setQueryData(["user"], activeUser);

    return { activeUser, roles };
};

const clearAuthData = (queryClient) => {
    cookies.remove("auth_token", { path: "/" });
    cookies.remove("user_data", { path: "/" });
    cookies.remove("user_role", { path: "/" });
    cookies.remove("user_roles", { path: "/" });
    queryClient.clear(); // تنظيف الكاش بالكامل عند الخروج
};

// --- 2. Authentication Hooks ---

// هوك لجلب بيانات المستخدم الحالي (استخدمه في الـ Navbar أو الـ Sidebar)
export const useUser = () => {
    const getStoredUser = () => cookies.get("user_data") || null;
    const getStoredToken = () => cookies.get("auth_token") || null;

    return useQuery({
        queryKey: ["user"],
        queryFn: getStoredUser,
        initialData: getStoredUser(),
        staleTime: Infinity,
        select: (user) => ({
            user,
            isAuthenticated: !!user && !!getStoredToken(),
            userRole: cookies.get("user_role") || null,
            userRoles: cookies.get("user_roles") || [],
        })
    });
};

// هوك تسجيل الدخول
export const useLogin = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: authService.login,
        onSuccess: (response) => {
            const { activeUser, roles } = saveAuthData(response, queryClient);
            showAlert.success(
                "تم تسجيل الدخول بنجاح",
                `مرحباً بك، ${activeUser?.firstName || activeUser?.FirstName || "مستخدمنا العزيز"}`
            );

            // توجيه المستخدم حسب الرتبة بدقة
            const formattedRoles = roles?.map(r => r.toLowerCase()) || [];

            if (formattedRoles.includes("superadmin")) {
                navigate("/supermanager");
            } else if (formattedRoles.includes("admin")) {
                navigate("/admin");
            } else if (formattedRoles.includes("donor")) {
                navigate("/donor");
            } else {
                navigate("/");
            }
        },
        onError: (err) => {
            console.log(err?.response)
            showAlert.error("فشل تسجيل الدخول", err?.response?.data || "تأكد من البيانات");
        },
    });
};
// هوك تسجيل مستخدم عادي أو أدمن
export const useRegisterUserOrAdmin = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: authService.registerUserOrAdmin,
        onSuccess: () => {
            showAlert.success("تم إنشاء الحساب", "تم تسجيل المستخدم بنجاح");
            navigate("/login");
        },
        onError: (err) => {
            showAlert.error("فشل التسجيل", err?.response?.data?.message || "حدث خطأ ما");
        },
    });
};

// هوك تسجيل المتبرع (يدعم FormData لرفع الصور)
export const useRegisterDonor = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: authService.registerDonor,
        onSuccess: () => {
            showAlert.success("تم إنشاء الحساب", "تم تسجيل المتبرع بنجاح");
            navigate("/login");
        },
        onError: (err) => {
            console.log(err?.response)
            showAlert.error("فشل التسجيل", err?.response?.data?.title || "تأكد من البيانات المرفوعة");
        },
    });
};

// هوك تسجيل سوبر أدمن
export const useRegisterSuperAdmin = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: authService.registerSuperAdmin,
        onSuccess: () => {
            showAlert.success("تم إنشاء الحساب", "تم تسجيل السوبر أدمن بنجاح");
            navigate("/login");
        },
        onError: (err) => {
            showAlert.error("فشل التسجيل", err?.response?.data?.message || "حدث خطأ ما");
        },
    });
};

// --- 3. Password Recovery Hooks ---

// هوك نسيان كلمة المرور (إرسال الكود)
export const useForgotPassword = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: authService.forgetPassword,
        onSuccess: (data, email) => {
            const oldData = resetPasswordStorage.get() || {};
            resetPasswordStorage.set({ ...oldData, email });
            showAlert.success("تم إرسال الكود", data?.message || "افحص بريدك الإلكتروني");
            navigate("/check-code");
        },
        onError: (err) => {
            showAlert.error("خطأ", err?.response?.data?.message || "تأكد من البريد الإلكتروني");
        },
    });
};

// هوك التحقق من الكود
export const useCheckCode = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: authService.checkCode,
        onSuccess: (data, variables) => {
            const token = data?.token || data?.data?.token || "";
            resetPasswordStorage.set({
                email: variables.email,
                code: variables.code,
                token,
            });
            showAlert.success("تم التحقق بنجاح", "الكود صحيح");
            navigate("/reset-password");
        },
        onError: (err) => {
            showAlert.error("كود غير صحيح", err?.response?.data?.message || "تأكد من الكود");
        },
    });
};

// هوك تعيين كلمة المرور الجديدة
export const useResetPassword = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: authService.resetPassword,
        onSuccess: (data) => {
            resetPasswordStorage.clear();
            showAlert.success("تم التغيير", "يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة");
            navigate("/login");
        },
        onError: (err) => {
            showAlert.error("فشل إعادة التعيين", err?.response?.data?.message || "حدث خطأ ما");
        },
    });
};

// --- 4. Session Hooks ---

// هوك تسجيل الخروج
export const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const logout = async () => {
        const confirmed = await showAlert.confirm(
            "تسجيل الخروج",
            "هل تريد تسجيل الخروج؟",
            "نعم، اخرج",
            "إلغاء"
        );
        if (!confirmed) return;
        clearAuthData(queryClient);
        showAlert.success("تم تسجيل الخروج", "نراك قريبًا");
        navigate("/login");
    };

    return { logout };
};