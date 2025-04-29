import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { useGetExerciseById } from "@/services/hooks/exercise-hooks";
import { Info } from "lucide-react";

export function ExerciseDetailsDialog({ exerciseId }: { exerciseId: number | string }) {
    const { data, isLoading, isError } = useGetExerciseById(exerciseId);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link">
                    <Info />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                {isLoading && <Spinner />}
                {isError && <p>An error occurred in fetching exercise details</p>}
                {!isLoading && !isError && (
                    <>
                        <DialogHeader>
                            <DialogTitle>{data.name}</DialogTitle>
                            <DialogDescription>{data.description}</DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-2 text-xs text-secondary-foreground text-center">
                            <p>Muscle Group</p>
                            <p>Typical Equipment</p>
                            <p className="text-primary">{data.muscleGroup}</p>
                            <p className="text-primary">{data.equipment}</p>
                        </div>
                        <DialogFooter>
                            <DialogClose>
                                <Button className="w-full">Got it !</Button>
                            </DialogClose>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
