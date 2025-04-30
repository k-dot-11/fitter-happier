import { useMutation } from "@tanstack/react-query";
import {
    analyzeSets,
    generateWorkoutPlan,
    getMotivationQuote,
    suggestImprovements,
} from "../apis/ai-apis";

export const useGetMotivationQuote = () =>
    useMutation({
        mutationFn: getMotivationQuote,
    });

export const useGenerateWorkoutPlan = () =>
    useMutation({
        mutationFn: generateWorkoutPlan,
    });

export const useAnalyzeSets = () =>
    useMutation({
        mutationFn: analyzeSets,
    });

export const useSuggestImprovements = () =>
    useMutation({
        mutationFn: suggestImprovements,
    });
