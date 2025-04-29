import { axiosInstance } from "../axios-instance";

export const getExercises = async () => {
    const response = axiosInstance.get("/exercises");
    return (await response).data;
};

export const getExerciseById = async (id: number | string) => {
    const response = await axiosInstance.get(`/exercises/${id}`);
    return response.data;
};

export const createExercise = async (data: any) => {
    const response = await axiosInstance.post("/exercises", data);
    return response.data;
};
