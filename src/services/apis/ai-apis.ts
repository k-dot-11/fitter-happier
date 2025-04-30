import { axiosInstance } from "../axios-instance";

export const generateWorkoutPlan = async (prompt: string) => {
    const response = await axiosInstance.post("/ai/generate", prompt);
    return response.data;
};

export const analyzeSets = async (sets: any[]) => {
    const response = await axiosInstance.post("/ai/analyze-sets", sets);
    return response.data;
};

export const getMotivationQuote = async (mood: string) => {
    const response = await axiosInstance.get(`/ai/motivation-quote?mood=${mood}`);
    return response.data;
};

export const suggestImprovements = async (sets: any[]) => {
    const response = await axiosInstance.post("/ai/suggest-improvements", sets);
    return response.data;
};
