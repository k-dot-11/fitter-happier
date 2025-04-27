import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Activity, Clock, Dumbbell, Footprints } from "lucide-react";
import { RecentWorkoutTable } from "./recent-workout-table";

const HomeRecentWorkout = () => {
    return (
        <Card className="px-4">
            <div className="flex gap-5 items-center">
                <Activity size={24} className="text-pink-300" />
                <div>
                    <p className="font-bold text-lg">
                        Your most recent workout
                    </p>
                    <p className="text-gray-400">27th January</p>
                </div>
            </div>
            <Separator className="mt-1" />
            <div className="flex flex-col gap-2">
                <div className="flex justify-around items-center px-5">
                    <div className="flex gap-2 flex-col items-center">
                        <Dumbbell />
                        <p>50kg</p>
                    </div>
                    <Separator orientation="vertical" className="h-6" />
                    <div className="flex gap-2 flex-col items-center">
                        <Footprints />
                        <p>3.3 KM</p>
                    </div>
                    <Separator orientation="vertical" className="h-6" />
                    <div className="flex gap-2 flex-col items-center">
                        <Clock />
                        <p>58 Mins</p>
                    </div>
                </div>
            </div>
            <Separator />
            <RecentWorkoutTable />
        </Card>
    );
};

export default HomeRecentWorkout;
