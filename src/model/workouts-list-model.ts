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
    workoutType: string | null;
    name: string;
    startedAt: string; // ISO date string
    duration: number;  // Duration in minutes
  }
  