import axios from "axios";
import { getAuthToken } from "./utils";

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