import { ExerciseDetailsDialog } from "@/components/spec/workout-details/exercise-details-dialog";
import WorkoutExercisesNotAddedBox from "@/components/spec/workout-details/workout-exercises-not-added-box";
import WorkoutSetList from "@/components/spec/workout-details/workout-set-list";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useWorkoutSummary } from "@/services/hooks/workout-hooks";
import { AxiosError } from "axios";
import { Clock, Dumbbell, Footprints, HeartCrack, Info } from "lucide-react";
import { useParams } from "react-router";

const WorkoutDetailsPage = () => {
    const { workoutId } = useParams();
    if (!workoutId) return <></>;
    const { data, isLoading, isError, error } = useWorkoutSummary(workoutId);
    return (
        <div className="flex flex-col gap-4 pt-24 px-4 pb-3">
            {isLoading && (
                <div className="flex flex-col items-center justify-center">
                    <Spinner /> <p>Loading Workout</p>
                </div>
            )}
            {isError && (
                <div className="flex flex-col items-center justify-center">
                    {(error as AxiosError).status === 404 ? (
                        <WorkoutExercisesNotAddedBox />
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-3">
                            <HeartCrack />
                            <p className="text-center">
                                There seems to be an issue with the network
                            </p>
                        </div>
                    )}
                </div>
            )}
            {!isLoading && !isError && data && (
                <>
                    <div className="flex justify-between">
                        <div>
                            <h1 className="text-xl pb-2">{data.name}</h1>
                            <p className="text-gray-400 flex gap-2 items-center">
                                <Clock className="size-6" />
                                {data.metadata.duration} mins
                            </p>
                        </div>
                        <div>
                            <p className="text-primary text-lg pb-2">
                                {data.workoutType.toUpperCase()}
                            </p>
                            <p>{data.startedAt.split("T")[0]}</p>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center px-5">
                        <div className="flex gap-2 flex-col items-center">
                            <Dumbbell />
                            <p>{data.metadata.totalWeight.toFixed(0)} kg</p>
                        </div>
                        <Separator orientation="vertical" className="h-6" />
                        <div className="flex gap-2 flex-col items-center">
                            <Footprints />
                            <p>{data.metadata.totalDistance} km</p>
                        </div>
                        <Separator orientation="vertical" className="h-6" />
                        <div className="flex gap-2 flex-col items-center">
                            <Clock />
                            <p>{data.metadata.duration} mins</p>
                        </div>
                    </div>
                    <div className="pt-3 flex flex-col gap-3">
                        {data.exercises.map((item) => {
                            return (
                                <div
                                    className="p-3 rounded-xl bg-card border-1 shadow-md"
                                    key={item.id}
                                >
                                    <div className="flex justify-between items-center pb-2">
                                        <p className="font-light">{item.exerciseName}</p>
                                        <div className="flex justify-end">
                                            <ExerciseDetailsDialog exerciseId={item.exerciseId} />
                                        </div>
                                    </div>
                                    <Separator className="bg-secondary-foreground" />
                                    <div className="py-2">
                                        {item.sets.length > 0 ? (
                                            <WorkoutSetList data={item.sets} />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center pt-2 gap-2 text-xs">
                                                <Info />
                                                <p>No sets added for this exercise</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default WorkoutDetailsPage;
