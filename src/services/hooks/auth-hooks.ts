import { useQuery } from "@tanstack/react-query";
import { getCurrentUser, getUserDetails, getUserProfileById } from "../apis/auth-apis";
import { useMutation } from "@tanstack/react-query";
import { setAuthToken } from "../utils";
import { axiosInstance } from "../axios-instance";
import { createUserProfile, refreshToken, registerUserAndProfile, updateUserProfile } from "../apis/auth-apis";


export const useGetUserDetails = () => {
    return useQuery({
        queryKey: ["userDetails"],
        queryFn: getUserDetails,
    });
};

export const useGetCurrentUser = () =>
    useQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
    });

export const useGetUserProfileById = (userId: number) =>
    useQuery({
        queryKey: ["userProfile", userId],
        queryFn: () => getUserProfileById,
        enabled: !!userId,
    });

export const useLogin = (onSuccess: any, onError: any) =>
    useMutation({
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            const response = await axiosInstance.post<{
                accessToken: string;
                refreshToken: string;
            }>("/auth/login", { email, password });
            setAuthToken(response.data.accessToken);
            return response;
        },
        onSuccess,
        onError,
    });

export const useRegister = (onSuccess: any, onError: any) =>
    useMutation({
        mutationFn: registerUserAndProfile,
        onSuccess,
        onError,
    });

export const useRefreshToken = () =>
    useMutation({
        mutationFn: refreshToken,
    });

export const useCreateUserProfile = () =>
    useMutation({
        mutationFn: createUserProfile,
    });

export const useUpdateUserProfile = () =>
    useMutation({
        mutationFn: updateUserProfile,
    });
