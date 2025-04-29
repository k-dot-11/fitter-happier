import axios from "axios";
import { getAuthToken } from "./utils";

export const axiosInstance = axios.create({
    baseURL: "https://electric-nancee-k-dot-11-3cf6d05c.koyeb.app",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAuthToken(); // Retrieve the token from localStorage
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);