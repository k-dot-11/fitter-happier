import { WorkoutExerciseByWorkoutIdResponse } from "@/model/workout-details-model";
import { axiosInstance } from "../axios-instance";

export const getWorkoutExercises = async (workoutId: number) => {
    const response = await axiosInstance.get(`/workout/${workoutId}`);
    return response.data;
};

export const getWorkoutExercisesByWorkoutId = async (workoutId: string | number) : Promise<WorkoutExerciseByWorkoutIdResponse> => {
    const response = await axiosInstance.get(`/workout-exercises/workout/${workoutId}`);
    return response.data;
};

export const createWorkoutExercise = async (data: any) => {
    const response = await axiosInstance.post("/workout-exercises", data);
    return response.data;
};

export const updateWorkoutExercise = async ({
    workoutId,
    data,
}: {
    workoutId: number;
    data: any;
}) => {
    const response = await axiosInstance.put(`/workout-exercises/${workoutId}`, data);
    return response.data;
};
