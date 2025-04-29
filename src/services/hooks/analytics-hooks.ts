import { useQuery } from "@tanstack/react-query";
import { getDashboardComparison } from "../apis/analytics-api";

export const useDashboardComparison = () => {
    return useQuery({
        queryKey: ["dashboard_comparison"],
        queryFn: getDashboardComparison,
        retry: 3,
    });
};
