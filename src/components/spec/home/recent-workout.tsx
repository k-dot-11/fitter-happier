import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Activity, Clock, Dumbbell, Footprints, TriangleAlert } from "lucide-react";
import { RecentWorkoutTable } from "./recent-workout-table";
import { useWorkoutSummary } from "@/services/hooks/workout-hooks";
import { Spinner } from "@/components/ui/spinner";

const HomeRecentWorkout = () => {
    const { data, isLoading, isError } = useWorkoutSummary("recent");

    if (isLoading)
        return (
            <Card className="px-4 flex flex-col items-center">
                <Spinner />
            </Card>
        );
    if (isError || !data)
        return (
            <Card className="px-4 flex flex-col items-center gap-2">
                <TriangleAlert />
                <p>An error occurred.</p>
            </Card>
        );
    return (
        <Card className="px-4">
            <div className="flex gap-5 items-center">
                <Activity size={24} className="text-pink-300" />
                <div>
                    <p className="font-bold text-lg">Your most recent workout</p>
                    <p className="text-gray-400">{}</p>
                    <p className="text-gray-400">27th January</p>
                </div>
            </div>
            <Separator className="mt-1" />
            <div className="flex flex-col gap-2">
                <div className="flex justify-around items-center px-5">
                    <div className="flex gap-2 flex-col items-center">
                        <Dumbbell />
                        <p>{data?.metadata.totalWeight.toFixed(0)} kg</p>
                    </div>
                    <Separator orientation="vertical" className="h-6" />
                    <div className="flex gap-2 flex-col items-center">
                        <Footprints />
                        <p>{data?.metadata.totalDistance} km</p>
                    </div>
                    <Separator orientation="vertical" className="h-6" />
                    <div className="flex gap-2 flex-col items-center">
                        <Clock />
                        <p>{data?.metadata.duration} mins</p>
                    </div>
                </div>
            </div>
            <Separator />
            {data && data.exercises.length === 0 ? (
                <div className="flex justify-center w-full text-gray-500">No exercises logged</div>
            ) : (
                <RecentWorkoutTable workouts={data?.exercises} />
            )}
        </Card>
    );
};

export default HomeRecentWorkout;
