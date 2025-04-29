import { Spinner } from "@/components/ui/spinner";
import { WorkoutExerciseByWorkoutId } from "@/model/workout-details-model";
import { useGetWorkoutExercisesByWorkoutId } from "@/services/better-api";
import { AxiosError } from "axios";

const WorkoutCardDetails = ({ id }: { id: string }) => {
    const { data, isLoading, isError, error } = useGetWorkoutExercisesByWorkoutId(id);
    if (isLoading) return <Spinner />;
    if (isError) {
        return (error as AxiosError).status === 404 ? (
            <p>No workout exercises logged</p>
        ) : (
            <p>{error.message}</p>
        );
    }
    return (
        <div>
            {data?.map((workoutExercise: WorkoutExerciseByWorkoutId) => {
                const { exercise } = workoutExercise;
                return <li>{exercise.name}</li>;
            })}
        </div>
    );
};

export default WorkoutCardDetails;
