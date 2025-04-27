import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Activity, Clock, Dumbbell, Footprints } from "lucide-react";
import { RecentWorkoutTable } from "./recent-workout-table";
import { listGetWorkoutSets, useGetAllWorkouts, useGetWorkoutExercisesByWorkoutId, useGetWorkoutSets } from "@/services/better-api";
import { useMemo } from "react";
import { format } from 'date-fns';

const HomeRecentWorkout = () => {
    // 1. Fetch all workouts and get the most recent one
    const { data: workoutsData, isLoading: loadingWorkouts } = useGetAllWorkouts();
    const recentWorkout = useMemo(() => {
        if (!workoutsData?.data?.length) return null;
        // Sort by date if available, else take last
        console.log(workoutsData.data[1]);
        return workoutsData.data[1];
        // return workoutsData.data[workoutsData.data.length - 1];
    }, [workoutsData]);

    // 2. Fetch exercises for the recent workout
    const { data: exercisesData, isLoading: loadingExercises } = useGetWorkoutExercisesByWorkoutId(recentWorkout?.id);

    // 3. Fetch sets for each exercise
    const workoutExercises = exercisesData?.data || [];
    // For each exercise, fetch sets (could also use Promise.all and a custom hook for batching)
    const setsQueries = listGetWorkoutSets(workoutExercises);
    const isLoadingSets = setsQueries.some((query) => query.isLoading);

    // Check if any query has an error
    const hasError = setsQueries.some((query) => query.isError);

    // Extract the data for each exercise
    const allSets = setsQueries.map((query) => query.data || []);
    const tableData = useMemo(() => {
        return workoutExercises.map((exercise, idx) => {
            const sets = allSets[idx]; // Get sets for the current exercise
            const totalSets = sets.length;
    
            // Calculate average weight
            const avgWeight =
                sets.length > 0
                    ? (
                          sets.reduce((sum, set) => sum + (set.weight || 0), 0) /
                          sets.length
                      ).toFixed(1) + " kg"
                    : "-";
    
            // Calculate total distance
            const totalDistance =
                sets.length > 0
                    ? sets.reduce((sum, set) => sum + (set.distance || 0), 0).toFixed(2) + " km"
                    : "-";
    
            return {
                exercise: exercise.exercise.name,
                sets: totalSets,
                avgWeight,
                totalDistance,
            };
        });
    }, [workoutExercises, allSets]);
    
    // Calculate overall total distance
    const overallTotalDistance = useMemo(() => {
        return allSets
            .flat()
            .reduce((sum, set) => sum + (set.distance || 0), 0)
            .toFixed(2) + " km";
    }, [allSets]);
    
    if (isLoadingSets) return <div>Loading workout sets...</div>;
    if (hasError) return <div>Error loading workout sets</div>;



    console.log("Table Data", tableData);
    // Example summary calculations (replace with your logic)
    const totalWeight = tableData.reduce((sum, row) => sum + parseFloat(row.avgWeight) || 0, 0) + "kg";

    if (loadingWorkouts || loadingExercises) return <div>Loading...</div>;
    if (!recentWorkout) return <div>No recent workout found.</div>;

    return (
        <Card className="px-4">
            <div className="flex gap-5 items-center">
                <Activity size={24} className="text-pink-300" />
                <div>
                    <p className="font-bold text-lg">
                        Your most recent workout
                    </p>
                    <p className="text-gray-400">{format(new Date(recentWorkout.startedAt), "MMMM d h:mm a") || "No Date"}</p>
                    {/* <p className="text-gray-400">27th January</p> */}
                </div>
            </div>
            <Separator className="mt-1" />
            <div className="flex flex-col gap-2">
                <div className="flex justify-around items-center px-5">
                    <div className="flex gap-2 flex-col items-center">
                        <Dumbbell />
                        <p>{totalWeight}</p>
                        {/* <p>50kg</p> */}
                    </div>
                    <Separator orientation="vertical" className="h-6" />
                    <div className="flex gap-2 flex-col items-center">
                        <Footprints />
                        {/* <p>3.3 KM</p> */}
                        <p>{overallTotalDistance}</p>
                    </div>
                    <Separator orientation="vertical" className="h-6" />
                    <div className="flex gap-2 flex-col items-center">
                        <Clock />
                        <p>{recentWorkout?.duration} mins</p>
                        {/* <p>58 Mins</p> */}
                    </div>
                </div>
            </div>
            <Separator />
            <RecentWorkoutTable workouts={tableData}/>
        </Card>
    );
};

export default HomeRecentWorkout;
