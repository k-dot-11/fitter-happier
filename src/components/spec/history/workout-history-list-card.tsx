import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Workout } from "@/model/workouts-list-model";
// import { timeAgo } from "@/utils/functions";
import { List } from "lucide-react";
import WorkoutCardDetails from "./workout-card-details";
import { Link } from "react-router";

function formatDuration(minutes: number) {
    if (minutes == null) return "-";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h > 0 ? `${h}h ` : ""}${m}m`;
}

const WorkoutHistoryListCard = ({ workoutDetails }: { workoutDetails: Workout }) => {
    const { name, duration, startedAt, workoutType, id } = workoutDetails;
    return (
        <div className="p-4 bg-card shadow-xl rounded-md">
            <div className="flex justify-between pb-2">
                <div>
                    <h1 className="font-bold">{name}</h1>
                    <p className="">{formatDuration(duration)}</p>
                </div>
                <div className="flex items-baseline">
                    <p className="bg-[#4a4a4a] text-xs rounded-md px-3 text-primary shadow-2xl">
                        {workoutType?.toLocaleUpperCase()}
                    </p>
                </div>
            </div>
            <Separator className="bg-gray-600 " />
            <div className="py-2">
                <WorkoutCardDetails id={id.toString()} />
            </div>
            <Separator className="bg-gray-600" />
            <div className="flex justify-between pt-2 items-baseline">
                <p className="text-gray-300 text-sm">{startedAt.split("T")[0]}</p>
                <div className="flex gap-2 items-center">
                    <Link to={`${id}`}>
                        <Button
                            size="sm"
                            className="border-1 border-primary text-primary items-center"
                            variant="ghost"
                        >
                            View
                            <List className="h-3 w-3" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default WorkoutHistoryListCard;
