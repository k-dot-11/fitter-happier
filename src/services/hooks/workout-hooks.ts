import { useMutation, useQuery } from "@tanstack/react-query";
import {
    createWorkout,
    getWorkoutById,
    getWorkoutByWorkoutId,
    getWorkouts,
    getWorkoutSummary,
    updateWorkout,
} from "../apis/workout-apis";

export const useGetAllWorkouts = () =>
    useQuery({
        queryKey: ["workouts"],
        queryFn: getWorkouts,
    });

export const useGetWorkoutById = (id: number) =>
    useQuery({
        queryKey: ["workout", id],
        queryFn: () => getWorkoutById(id),
        enabled: !!id,
    });

export const useCreateWorkout = (onSuccess: any, onError: any) =>
    useMutation({
        mutationFn: createWorkout,
        onSuccess,
        onError,
    });

export const useUpdateWorkout = () =>
    useMutation({
        mutationFn: updateWorkout,
    });

export const useGetWorkoutByWorkoutId = (userId: number) =>
    useQuery({
        queryKey: ["userWorkouts", userId],
        queryFn: () => getWorkoutByWorkoutId,
        enabled: !!userId,
    });

export const useWorkoutSummary = (workoutId: string | number) => {
    return useQuery({
        queryKey: ["workoutSummary", workoutId],
        queryFn: () => getWorkoutSummary(workoutId),
        retry: false,
    });
};
