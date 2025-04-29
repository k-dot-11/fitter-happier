import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ExerciseSet } from "@/model/workout-summary-model";
import { useMemo } from "react";

const WorkoutSetList = ({ data }: { data: ExerciseSet[] }) => {
    useMemo(() => {
        data = data.sort((a, b) => a.setNumber - b.setNumber);
    }, [data]);
    return (
        <Table className="">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Set #</TableHead>
                    <TableHead>Reps</TableHead>
                    <TableHead>Weight</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.setNumber}</TableCell>
                        <TableCell>{item.reps}</TableCell>
                        <TableCell>{item.weight} kg</TableCell>
                        <TableCell className="text-right">{item.duration}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default WorkoutSetList;
