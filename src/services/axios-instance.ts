import axios from "axios";
import { getAuthToken, setAuthToken, setRefreshToken } from "./utils";
import { refreshToken } from "./apis/auth-apis";

export const axiosInstance = axios.create({
    baseURL: "/api", // Use relative path
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

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (originalRequest.url.includes("auth") || error.response?.status !== 403) return Promise.reject(error);
        if (
            !originalRequest._retry &&
            !originalRequest.url.includes("auth/refresh")
        ) {
            originalRequest._retry = true;
            const newToken = await refreshToken();
            if (newToken) {
                setAuthToken(newToken.accessToken);
                setRefreshToken(newToken.refreshToken);
                return axiosInstance(originalRequest);
            }
        }
        window.location.href = "/auth/login";
        return Promise.reject(error);
    }
);
