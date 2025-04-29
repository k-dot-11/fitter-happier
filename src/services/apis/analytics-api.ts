import { axiosInstance } from "../axios-instance";

export const getDashboardComparison = async () => {
    const response = await axiosInstance.get("/workouts/stats/comparison");
    return response.data;
};
