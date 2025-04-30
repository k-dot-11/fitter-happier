import { useMutation, useQuery } from "@tanstack/react-query";
import {
    createUserProfile,
    getCurrentUser,
    getUserDetails,
    getUserProfileById,
    loginWithEmailAndPassword,
    refreshToken,
    registerUserAndProfile,
    updateUserProfile,
} from "../apis/auth-apis";

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
        mutationFn: loginWithEmailAndPassword,
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
