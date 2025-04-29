import { useMutation, useQuery } from "@tanstack/react-query";
import { createExercise, getExerciseById, getExercises } from "../apis/exercise-apis";

export const useGetAllExercises = () =>
    useQuery({
        queryKey: ["exercises"],
        queryFn: () => getExercises,
    });

export const useGetExerciseById = (id: number | string) =>
    useQuery({
        queryKey: ["exercise", id],
        queryFn: () => getExerciseById(id),
        enabled: !!id,
    });

export const useCreateExercise = () =>
    useMutation({
        mutationFn: createExercise,
    });