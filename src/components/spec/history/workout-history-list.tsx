import { Workout } from "@/model/workouts-list-model";
import WorkoutHistoryListCard from "./workout-history-list-card";

const WorkoutHistoryList = ({ data }: { data: any }) => {
    return (
        <div className="flex flex-col gap-3">
            {data.map((item : Workout) => {
                return (
                    <WorkoutHistoryListCard workoutDetails={item} key={item.id}/>
                )
            })}
        </div>
    );
};

export default WorkoutHistoryList;
