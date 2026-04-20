import axios from 'axios';
import { toFormData } from './../helpers/heplper';
import Cookies from 'universal-cookie';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const axiosApi = axios.create({ baseURL: BASE_URL });

axiosApi.interceptors.request.use(
    (config) => {

        // ✅ 1. حط التوكين الأول (مهم جدًا)
        const cookies = new Cookies();
        const token = cookies.get("auth_token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // ✅ 2. لو مفيش data أو FormData → كمل عادي
        if (!config.data || config.data instanceof FormData) {
            return config;
        }

        // ✅ 3. check files
        const hasFile = (obj) => {
            if (typeof obj !== 'object' || obj === null) return false;

            return Object.values(obj).some(v => {
                if (v instanceof File || v instanceof Blob) return true;
                if (Array.isArray(v)) {
                    return v.some(inner => inner instanceof File || inner instanceof Blob);
                }
                return false;
            });
        };

        if (hasFile(config.data)) {
            config.data = toFormData(config.data);

            if (config.headers) {
                delete config.headers["Content-Type"];
            }
        } else {
            config.headers["Content-Type"] = "application/json";
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosApi;