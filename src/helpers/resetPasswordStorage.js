const RESET_PASSWORD_KEY = "reset_password_data";

export const resetPasswordStorage = {
    set(data) {
        sessionStorage.setItem(RESET_PASSWORD_KEY, JSON.stringify(data));
    },

    get() {
        const data = sessionStorage.getItem(RESET_PASSWORD_KEY);
        return data ? JSON.parse(data) : null;
    },

    clear() {
        sessionStorage.removeItem(RESET_PASSWORD_KEY);
    },
};