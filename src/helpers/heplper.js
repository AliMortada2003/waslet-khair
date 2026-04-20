/**
 * دالة لتحويل الكائنات العادية إلى FormData بشكل تلقائي
 * @param {Object} data - البيانات المراد تحويلها
 * @returns {FormData}
 */
export const toFormData = (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
        const value = data[key];

        if (value === null || value === undefined) return;

        if (Array.isArray(value)) {
            value.forEach((item) => {
                formData.append(key, item);
            });
        }
        else if (typeof value === "boolean") {
            formData.append(key, value ? "true" : "false");
        }
        else {
            formData.append(key, value);
        }
    });

    return formData;
};