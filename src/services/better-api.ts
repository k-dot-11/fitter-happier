import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

// Utility to get the auth token from localStorage
export const getAuthToken = (): string | null => {
    if (typeof window === "undefined") return null; // Ensure this runs only in the browser
    return localStorage.getItem("auth-token");
};

// Utility to set the auth token in localStorage
export const setAuthToken = (token: string): void => {
    if (typeof window === "undefined") return; // Ensure this runs only in the browser
    localStorage.setItem("auth-token", token);
};

// Utility to remove the auth token from localStorage
export const removeAuthToken = (): void => {
    if (typeof window === "undefined") return; // Ensure this runs only in the browser
    localStorage.removeItem("auth-token");
};

const axiosInstance = axios.create({
    baseURL: "https://holyholy-bs4c.onrender.com/",
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

const getUserDetails = async () => {
    const response = await axiosInstance.get("/users/1");
    return response.data;
};

export const useGetUserDetails = () => {
    return useQuery({
        queryKey: ["userDetails"],
        queryFn: getUserDetails,
    });
};

export const useLogin = (onSuccess: any, onError: any) =>
    useMutation({
        mutationFn: async ({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) => {
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

export const useRegister = (onSuccess : any, onError : any) =>
    useMutation({
        mutationFn: async ({
            email,
            password,
            username,
        }: {
            email: string;
            password: string;
            username: string;
        }) => {
            const response = await axiosInstance.post("/auth/register", {
                email,
                password,
                username,
            });
            setAuthToken(response.data.accessToken);
            return response.data;
        },
        onSuccess,
        onError
    });

export const useRefreshToken = () =>
    useMutation({
        mutationFn: async (refreshToken: string) => {
            const response = await axiosInstance.post<{
                token: string;
                refreshToken: string;
            }>("/auth/refresh", { refreshToken });
            //   setAuthToken(response.token);
            return response;
        },
    });

// --- User Hooks ---

export const getCurrentUser = async () => {
    const response = await axiosInstance.get("/users/me");
    return response.data;
};

export const useGetCurrentUser = () =>
    useQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
    });

export const useGetUserProfile = (userId: number) =>
    useQuery({
        queryKey: ["userProfile", userId],
        queryFn: () => axiosInstance.get(`/user-profiles/${userId}`),
        enabled: !!userId,
    });

export const useCreateUserProfile = () =>
    useMutation({
        mutationFn: ({
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
            }),
    });

export const useUpdateUserProfile = () =>
    useMutation({
        mutationFn: ({ userId, data }: { userId: number; data: any }) =>
            axiosInstance.put(`/user-profiles/${userId}`, data),
    });

// --- Exercise Hooks ---

export const useGetAllExercises = () =>
    useQuery({
        queryKey: ["exercises"],
        queryFn: () => axiosInstance.get("/exercises"),
    });

export const useGetExerciseById = (id: number) =>
    useQuery({
        queryKey: ["exercise", id],
        queryFn: () => axiosInstance.get(`/exercises/${id}`),
        enabled: !!id,
    });

export const useCreateExercise = () =>
    useMutation({
        mutationFn: (data: any) => axiosInstance.post("/exercises", data),
    });

// --- Workout Hooks ---

export const useGetAllWorkouts = () =>
    useQuery({
        queryKey: ["workouts"],
        queryFn: () => axiosInstance.get("/workouts"),
    });

export const useGetWorkoutById = (id: number) =>
    useQuery({
        queryKey: ["workout", id],
        queryFn: () => axiosInstance.get(`/workouts/${id}`),
        enabled: !!id,
    });

export const useCreateWorkout = () =>
    useMutation({
        mutationFn: (data: any) => axiosInstance.post("/workouts", data),
    });

export const useUpdateWorkout = () =>
    useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) =>
            axiosInstance.put(`/workouts/${id}`, data),
    });

export const useGetWorkoutsByUserId = (userId: number) =>
    useQuery({
        queryKey: ["userWorkouts", userId],
        queryFn: () => axiosInstance.get(`/user/${userId}`),
        enabled: !!userId,
    });

// --- Workout Exercise Hooks ---

export const useGetWorkoutExercises = (workoutId: number) =>
    useQuery({
        queryKey: ["workoutExercises", workoutId],
        queryFn: () => axiosInstance.get(`/workout/${workoutId}`),
        enabled: !!workoutId,
    });

export const useGetWorkoutExercisesByWorkoutId = (workoutId: number) =>
    useQuery({
        queryKey: ["workoutExercisesByWorkout", workoutId],
        queryFn: () =>
            axiosInstance.get(`/workout-exercises/workout/${workoutId}`),
        enabled: !!workoutId,
    });

export const useCreateWorkoutExercise = () =>
    useMutation({
        mutationFn: (data: any) =>
            axiosInstance.post("/workout-exercises", data),
    });

export const useUpdateWorkoutExercise = () =>
    useMutation({
        mutationFn: ({ workoutId, data }: { workoutId: number; data: any }) =>
            axiosInstance.put(`/workout-exercises/${workoutId}`, data),
    });

// --- Workout Set Hooks ---

export const useGetWorkoutSets = (workoutExerciseId: number) =>
    useQuery({
        queryKey: ["workoutSets", workoutExerciseId],
        queryFn: () =>
            axiosInstance.get(
                `/workout-sets/workout-exercise/${workoutExerciseId}`
            ),
        enabled: !!workoutExerciseId,
    });

export const useCreateWorkoutSet = () =>
    useMutation({
        mutationFn: (data: any) => axiosInstance.post("/workout-sets", data),
    });

export const useUpdateWorkoutSet = () =>
    useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) =>
            axiosInstance.put(`/workout-sets/${id}`, data),
    });

export const useDeleteWorkoutSet = () =>
    useMutation({
        mutationFn: (id: number) => axiosInstance.delete(`/workout-sets/${id}`),
    });

// --- AI Hooks ---

export const useGenerateWorkoutPlan = () =>
    useMutation({
        mutationFn: (prompt: string) =>
            axiosInstance.post("/ai/generate", prompt),
    });

export const useAnalyzeSets = () =>
    useMutation({
        mutationFn: (sets: any[]) =>
            axiosInstance.post("/ai/analyze-sets", sets),
    });

export const useGetMotivationQuote = (mood: string) =>
    useQuery({
        queryKey: ["motivationQuote", mood],
        queryFn: () => axiosInstance.get(`/ai/motivation-quote?mood=${mood}`),
        enabled: !!mood,
    });

export const useSuggestImprovements = () =>
    useMutation({
        mutationFn: (sets: any[]) =>
            axiosInstance.post("/ai/suggest-improvements", sets),
    });
