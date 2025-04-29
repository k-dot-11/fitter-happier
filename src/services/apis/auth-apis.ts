import { axiosInstance } from "../axios-instance";
import { setAuthToken } from "../utils";

export const registerUserAndProfile = async ({
    email,
    password,
    username,
    birthDate,
    height,
    weight,
    fitnessGoal,
    experienceLevel,
}: {
    email: string;
    password: string;
    username: string;
    birthDate: string;
    height: number;
    weight: number;
    fitnessGoal: string;
    experienceLevel: string;
}) => {
    const registrationResponse = await axiosInstance.post("/auth/register", {
        email,
        password,
        name: username,
    });

    setAuthToken(registrationResponse.data.accessToken);

    const userProfileCreationResponse = await axiosInstance.post("/user-profiles", {
        username,
        birthDate,
        height,
        weight,
        fitnessGoal,
        experienceLevel,
    });
    return {
        registrationResponse,
        userProfileCreationResponse,
    };
};

export const createUserProfile = async ({
    username,
    birthDate,
    height,
    weight,
    fitnessGoal,
    experienceLevel,
}: {
    username: string;
    birthDate: string;
    height: number;
    weight: number;
    fitnessGoal: string;
    experienceLevel: string;
}) =>
    axiosInstance.post("/user-profiles", {
        username,
        birthDate,
        height,
        weight,
        fitnessGoal,
        experienceLevel,
    });

export const updateUserProfile = async ({ userId, data }: { userId: number; data: any }) => {
    const response = await axiosInstance.put(`/user-profiles/${userId}`, data);
    return response.data;
};

export const getUserProfileById = async (userId: number) => {
    const response = await axiosInstance.get(`/user-profiles/${userId}`);
    return response.data;
};

export const getUserDetails = async () => {
    const response = await axiosInstance.get("/users/1");
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await axiosInstance.get("/users/me");
    return response.data;
};

export const refreshToken = async (refreshToken: string) => {
    const response = await axiosInstance.post<{
        token: string;
        refreshToken: string;
    }>("/auth/refresh", { refreshToken });
    return response.data;
};
