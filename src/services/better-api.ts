import { useMutation, useQueries, useQuery, UseQueryResult } from "@tanstack/react-query";
import { axiosInstance } from "./axios-instance";
import {
    createWorkoutExercise,
    getWorkoutExercises,
    getWorkoutExercisesByWorkoutId,
    updateWorkoutExercise,
} from "./apis/workout-exercises-api";
import { WorkoutExerciseByWorkoutIdResponse } from "@/model/workout-details-model";

export const useGetWorkoutExercises = (workoutId: number) =>
    useQuery({
        queryKey: ["workoutExercises", workoutId],
        queryFn: () => getWorkoutExercises(workoutId),
        enabled: !!workoutId,
    });

export const useGetWorkoutExercisesByWorkoutId = (workoutId: string) : UseQueryResult<WorkoutExerciseByWorkoutIdResponse> =>
    useQuery({
        queryKey: ["workoutExercisesByWorkout", workoutId],
        queryFn: () => getWorkoutExercisesByWorkoutId(workoutId),
        enabled: !!workoutId,
        retry: (failureCount, error: any) => {
            if (error?.response?.status === 404) return false;
            return failureCount <= 2;
        },
    });

export const useCreateWorkoutExercise = () =>
    useMutation({
        mutationFn: createWorkoutExercise,
    });

export const useUpdateWorkoutExercise = () =>
    useMutation({
        mutationFn: updateWorkoutExercise,
    });

// --- Workout Set Hooks ---
export const listGetWorkoutSets = (workoutExercises: any) =>
    useQueries({
        queries: workoutExercises.map((exercise: any) => ({
            queryKey: ["workoutSets", exercise.id],
            queryFn: async () => {
                const response = await axiosInstance.get(
                    `/workout-sets/workout-exercise/${exercise.id}`
                );
                return response.data;
            },
            enabled: !!exercise.id, // Only run the query if exercise.id is truthy
        })),
    });

export const useGetWorkoutSets = (workoutExerciseId: number) =>
    useQuery({
        queryKey: ["workoutSets", workoutExerciseId],
        queryFn: async () => {
            const response = await axiosInstance.get(
                `/workout-sets/workout-exercise/${workoutExerciseId}`
            );
            return response.data;
        },
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
        mutationFn: (prompt: string) => axiosInstance.post("/ai/generate", prompt),
    });

export const useAnalyzeSets = () =>
    useMutation({
        mutationFn: (sets: any[]) => axiosInstance.post("/ai/analyze-sets", sets),
    });

export const useGetMotivationQuote = (mood: string) =>
    useQuery({
        queryKey: ["motivationQuote", mood],
        queryFn: () => axiosInstance.get(`/ai/motivation-quote?mood=${mood}`),
        enabled: !!mood,
    });

export const useSuggestImprovements = () =>
    useMutation({
        mutationFn: (sets: any[]) => axiosInstance.post("/ai/suggest-improvements", sets),
    });
