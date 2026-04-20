import axiosApi from "../Axios/axios";

const authService = {
    registerUserOrAdmin: async (payload) => {
        const res = await axiosApi.post("User/Admin-Register", payload);
        return res.data;
    },

    registerSuperAdmin: async (payload) => {
        const res = await axiosApi.post("User/SuperAdmin-Register", payload);
        return res.data;
    },

    registerDonor: async (payload) => {
        // payload هنا هو الـ FormData اللي بعتناه من الـ onSubmit
        const res = await axiosApi.post("User/Donor-Register", payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    },

    login: async (payload) => {
        // console.log(payload)
        const res = await axiosApi.post("User/Login", payload);
        return res.data;
    },

    forgetPassword: async (email) => {
        const res = await axiosApi.post(
            "User/ForgetPassword",
            // هنا حولناها علشان السيرفر مستني مني ابعتله سترينج  "Email"
            JSON.stringify(email),
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return res.data;
    },

    checkCode: async (payload) => {
        const res = await axiosApi.post("User/CheckCode", payload);
        return res.data;
    },

    resetPassword: async (payload) => {
        const res = await axiosApi.post("User/ResetPassword", payload);
        return res.data;
    },
};

export default authService;