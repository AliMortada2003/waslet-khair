import Swal from "sweetalert2";

// دالة مساعدة لجلب إعدادات الثيم
const getAlertTheme = () => ({
    background: document.documentElement.classList.contains("dark") ? "#0f172a" : "#fff",
    color: document.documentElement.classList.contains("dark") ? "#fff" : "#000",
});

export const showAlert = {
    success: (title, text = "") => {
        return Swal.fire({
            icon: "success",
            title,
            text,
            confirmButtonText: "ممتاز",
            confirmButtonColor: "#4f46e5",
            timer: 3000,
            timerProgressBar: true,
            ...getAlertTheme(),
        });
    },

    error: (title, text = "عذرًا، حدث خطأ ما") => {
        return Swal.fire({
            icon: "error",
            title,
            text,
            confirmButtonText: "حاول مجددًا",
            confirmButtonColor: "#ef4444",
            ...getAlertTheme(),
        });
    },

    confirm: async (optionsOrTitle, text = "") => {
        // لو بعتت Object، استخدمه كما هو، لو بعتت نص، حطه في الـ title
        const config = typeof optionsOrTitle === 'object'
            ? optionsOrTitle
            : { title: optionsOrTitle, text };

        const result = await Swal.fire({
            icon: "question",
            confirmButtonColor: "#4f46e5",
            cancelButtonColor: "#64748b",
            showCancelButton: true,
            reverseButtons: true,
            ...getAlertTheme(),
            ...config, // هنا بنعمل دمج لكل الإعدادات اللي بتبعتها
        });

        return result.isConfirmed;
    },
};