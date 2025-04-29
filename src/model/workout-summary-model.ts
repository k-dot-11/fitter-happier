// models/Workout.ts

export interface WorkoutSummary {
    id: number;
    workoutType: string;
    name: string;
    startedAt: string; // ISO date string
    metadata: WorkoutMetadata;
    exercises: Exercise[];
}

export interface WorkoutMetadata {
    duration: number; // in minutes
    totalWeight: number;
    totalDistance: number;
}

export interface Exercise {
    id: number;
    exerciseId: number;
    exerciseName: string;
    description: string;
    muscleGroup: string;
    equipment: string;
    trackType: string;
    orderIndex: number;
    sets: ExerciseSet[];
}

export interface ExerciseSet {
    id: number;
    setNumber: number;
    weight: number | null;
    reps: number | null;
    distance: number | null;
    duration: number | null;
}
