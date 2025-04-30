import { WorkoutExerciseByWorkoutIdResponse } from "@/model/workout-details-model";
import { useMutation, useQueries, useQuery, UseQueryResult } from "@tanstack/react-query";
import {
    createWorkoutExercise,
    getWorkoutExercises,
    getWorkoutExercisesByWorkoutId,
    updateWorkoutExercise,
} from "./apis/workout-exercises-api";
import { axiosInstance } from "./axios-instance";

export const useGetWorkoutExercises = (workoutId: number) =>
    useQuery({
        queryKey: ["workoutExercises", workoutId],
        queryFn: () => getWorkoutExercises(workoutId),
        enabled: !!workoutId,
    });

export const useGetWorkoutExercisesByWorkoutId = (
    workoutId: string
): UseQueryResult<WorkoutExerciseByWorkoutIdResponse> =>
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