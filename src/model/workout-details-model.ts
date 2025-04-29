// Authority model
export interface Authority {
    authority: string;
  }
  
  // User model
  export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    enabled: boolean;
    username: string;
    authorities: Authority[];
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
  }
  
  // Workout model
  export interface Workout {
    id: number;
    user: User;
    workoutType: string;
    name: string;
    startedAt: string; // ISO string
    duration: number;
  }
  
  // Exercise model
  export interface Exercise {
    id: number;
    name: string;
    customId: string | null;
    description: string;
    muscleGroup: string;
    equipment: string;
    trackType: string;
  }
  
  // Main WorkoutExerciseByWorkoutId model
  export interface WorkoutExerciseByWorkoutId {
    id: number;
    workout: Workout;
    exercise: Exercise;
    orderIndex: number;
  }
  
  // The response type is an array of WorkoutExerciseByWorkoutId
  export type WorkoutExerciseByWorkoutIdResponse = WorkoutExerciseByWorkoutId[];
  