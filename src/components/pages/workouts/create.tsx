import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { workoutTypes } from "@/data/workout-types";
import { useCreateWorkout } from "@/services/hooks/workout-hooks";
import { AnimatePresence, motion } from "framer-motion";
import {
    BicepsFlexed,
    CheckCircle,
    Clock,
    ClockFading,
    Info,
    List,
    Pencil,
    Plus
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const initializeCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const workoutCardVariants = {
    expanded: { height: "auto", opacity: 1 },
    collapsed: { height: 150, opacity: 1, transition: { duration: 0.5 } },
};

const addExercisesVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const today = new Date(Date.now()).toLocaleDateString("en-UK", {
    dateStyle: "short",
});

const CreateWorkoutPage = () => {
    const [workoutSaved, setWorkoutSaved] = useState(false);
    const [workoutName, setWorkoutName] = useState("Workout on " + today);
    const [workoutType, setWorkoutType] = useState("cardio");
    const [workoutDuration, setWorkoutDuration] = useState(0);
    const [workoutStartedAt, setWorkoutStartedAt] = useState(initializeCurrentDateTime());

    const onWorkoutMutationSuccess = (_data: any) => {
        toast.success("Workout created successfully!");
        setWorkoutSaved(true);
    };

    const onWorkoutMutationFailure = (e: any) => {
        toast.success("An error occurred while creating workout!");
        console.error(e.message);
    };

    const workoutCreationMutation = useCreateWorkout(
        onWorkoutMutationSuccess,
        onWorkoutMutationFailure
    );

    const handleWorkoutNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newWorkoutName = event.target.value;
        setWorkoutName(newWorkoutName);
    };

    const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDuration = event.target.value;
        setWorkoutDuration(parseInt(newDuration));
    };

    const handleWorkoutStartedAtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStartedAt = e.target.value;
        setWorkoutStartedAt(newStartedAt);
    };

    const handleRecordWorkout = () => {
        if (
            !workoutName ||
            !workoutType ||
            !workoutDuration ||
            workoutDuration <= 0 ||
            !workoutStartedAt
        ) {
            toast.error("Invalid inputs. Please check your entries.");
            return;
        }
        workoutCreationMutation.mutate({
            name: workoutName,
            workoutType: workoutType,
            startedAt: workoutStartedAt,
            duration: workoutDuration,
        });
    };

    return (
        <div className="flex flex-col gap-4 pt-24 px-4 pb-3">
            <div className="flex gap-3 items-end">
                <BicepsFlexed className="h-12 w-12 text-slate-200" />
                <h1 className="text-4xl text-slate-200">Add Workout</h1>
            </div>
            <Separator />

            {/* Workout Card with collapse animation */}
            <motion.div
                layout
                variants={workoutCardVariants}
                animate={workoutSaved ? "collapsed" : "expanded"}
                transition={{ type: "spring", duration: 0.6 }}
                style={{ overflow: "hidden" }}
            >
                <Card>
                    {!workoutSaved && (
                        <CardHeader>
                            <CardTitle>Add Workout</CardTitle>
                            <CardDescription>Log your workout session</CardDescription>
                        </CardHeader>
                    )}
                    <CardContent>
                        {!workoutSaved ? (
                            <>
                                <Separator />
                                <div className="flex flex-col gap-2 pt-4">
                                    <div className="flex gap-2 items-end">
                                        <Label>Workout Name</Label>
                                        <Pencil className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <Input
                                        placeholder="Workout Name"
                                        className="border-primary border-1"
                                        value={workoutName}
                                        onChange={handleWorkoutNameChange}
                                        type="text"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 pt-6">
                                    <div className="flex gap-2 items-end">
                                        <Label>Started At</Label>
                                        <Clock className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <Input
                                            placeholder="Duration in minutes"
                                            className="border-primary border-1"
                                            type="datetime-local"
                                            value={workoutStartedAt}
                                            onChange={handleWorkoutStartedAtChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 pt-6">
                                    <div className="flex gap-2 items-end">
                                        <Label>Type</Label>
                                        <List className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <Select value={workoutType} onValueChange={setWorkoutType}>
                                        <SelectTrigger className="w-[250px] border-primary border-1">
                                            <SelectValue placeholder="Select workout type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {workoutTypes.map((type) => (
                                                <SelectItem key={type.value} value={type.value}>
                                                    {type.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col gap-2 pt-4">
                                    <div className="flex gap-2 items-end">
                                        <Label>Duration</Label>
                                        <ClockFading className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <Input
                                        placeholder="Duration"
                                        className="border-primary border-1 w-1/3"
                                        value={workoutDuration}
                                        onChange={handleDurationChange}
                                        type="number"
                                        max={1000}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <div className="text-lg font-semibold">{workoutName}</div>
                                <div className="text-sm text-gray-400">
                                    {workoutType
                                        ? workoutTypes.find((t) => t.value === workoutType)?.label
                                        : "Type not set"}
                                </div>
                                <div className="text-sm text-gray-400">
                                    Duration: {workoutDuration} min
                                </div>
                            </div>
                        )}
                    </CardContent>
                    {!workoutSaved && (
                        <div className="px-4 flex">
                            <Button
                                className="w-full"
                                onClick={handleRecordWorkout}
                                disabled={workoutCreationMutation.isPending}
                            >
                                Record Workout
                                {workoutCreationMutation.isPending ? (
                                    <Spinner size="small" />
                                ) : (
                                    <CheckCircle className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    )}
                </Card>
            </motion.div>

            {/* Add Exercises Card with entrance animation */}
            <AnimatePresence>
                {workoutSaved && (
                    <motion.div
                        variants={addExercisesVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <Card className="px-4">
                            <div className="flex justify-between">
                                <div className="flex flex-col gap-1">
                                    <CardTitle>Add Exercises</CardTitle>
                                    <CardDescription>
                                        Add exercises to current workout
                                    </CardDescription>
                                </div>
                                <Button className="rounded-4xl" variant="default">
                                    <Plus />
                                </Button>
                            </div>
                            <Separator />
                            <div className="flex flex-col gap-2 justify-center items-center text-gray-300">
                                <Info />
                                <p className="text-center text-gray-300 text-xs">
                                    Your exercises will appear here
                                </p>
                            </div>
                            <Separator />
                            <Button>Save</Button>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CreateWorkoutPage;
