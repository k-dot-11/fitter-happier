import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Exercise } from "@/model/workout-summary-model";

export function RecentWorkoutTable({ workouts }: { workouts: Exercise[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-primary font-extrabold">Exercise</TableHead>
                    <TableHead className="text-primary text-center font-extrabold">Sets</TableHead>
                    <TableHead className="text-primary text-right font-extrabold">
                        Average
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {workouts.map((workout) => {
                    const avgSetWeight =
                        workout.sets.reduce((acc, set) => acc + (set.weight ? set.weight : 0), 0) /
                        workout.sets.length;

                    return (
                        <TableRow key={workout.id}>
                            <TableCell className="font-medium">{workout.exerciseName}</TableCell>
                            <TableCell className="text-center">{workout.sets.length}</TableCell>
                            <TableCell className="text-right">{avgSetWeight.toFixed(0)}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
