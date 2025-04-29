import { Workout } from "@/model/workouts-list-model";
import { axiosInstance } from "../axios-instance";
import { WorkoutSummary } from "@/model/workout-summary-model";

export const getWorkouts = async () : Promise<Workout[]> => {
    const reponse = await axiosInstance.get("/workouts");
    return reponse.data;
};

export const getWorkoutById = async (id: number | string) => {
    const response = await axiosInstance.get(`/workouts/${id}`);
    return response.data;
};

export const createWorkout = async (data: any) => {
    const response = await axiosInstance.post("/workouts", data);
    return response.data;
};

export const updateWorkout = async ({ id, data }: { id: number; data: any }) => {
    const response = await axiosInstance.put(`/workouts/${id}`, data);
    return response.data;
};

export const getWorkoutByWorkoutId = async (workoutId: number) => {
    const response = await axiosInstance.get(`/workouts/${workoutId}`);
    return response.data;
};

export const getWorkoutSummary = async (workoutId: string | number) : Promise<WorkoutSummary> => {
    const response = await axiosInstance.get(`/workouts/summary/${workoutId}`);
    return response.data
};