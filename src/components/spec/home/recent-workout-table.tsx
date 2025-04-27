import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

const workouts = [
    {
        exercise: "Bench Press",
        sets: 4,
        avgWeight: "60 kg",
    },
    {
        exercise: "Squat",
        sets: 5,
        avgWeight: "80 kg",
    },
    {
        exercise: "Deadlift",
        sets: 3,
        avgWeight: "100 kg",
    },
    {
        exercise: "Pull Ups",
        sets: 4,
        avgWeight: "Bodyweight",
    },
    {
        exercise: "Shoulder Press",
        sets: 3,
        avgWeight: "35 kg",
    },
];

export function RecentWorkoutTable() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-primary font-extrabold">Exercise</TableHead>
                    <TableHead className="text-primary text-center font-extrabold">
                        Sets
                    </TableHead>
                    <TableHead className="text-primary text-right font-extrabold">
                        Avg Weight
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {workouts.map((workout, idx) => (
                    <TableRow key={workout.exercise + idx}>
                        <TableCell className="font-medium">
                            {workout.exercise}
                        </TableCell>
                        <TableCell className="text-center">
                            {workout.sets}
                        </TableCell>
                        <TableCell className="text-right">
                            {workout.avgWeight}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
