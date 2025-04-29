import WorkoutHistoryList from "@/components/spec/history/workout-history-list";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useGetAllWorkouts } from "@/services/hooks/workout-hooks";
import { HeartCrack, History } from "lucide-react";

const WorkoutHistoryPage = () => {
    const { data, isLoading, isError} = useGetAllWorkouts();
    return (
        <div className="flex flex-col gap-4 pt-24 px-4 pb-3">
            <div className="flex gap-2">
                <History />
                <h1 className="text-xl">Workout History</h1>
            </div>
            <Separator />
            {isLoading && <Spinner />}
            {isError && (
                <div className="flex flex-col items-center gap-3 text-gray-400">
                    <HeartCrack size={50} />
                    <h2 className="text-xl">Well this is awkward</h2>
                    <p className="text-center text-sm">
                        There seems to be an issue with the connection
                    </p>
                </div>
            )}
            {!isLoading && !isError && <WorkoutHistoryList data={data} />}
        </div>
    );
};

export default WorkoutHistoryPage;
