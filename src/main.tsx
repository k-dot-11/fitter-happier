import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/layout/layout";
import HomePage from "./components/pages/home";
import "./index.css";
import { ThemeProvider } from "./utils/context/theme-provider";
import { LoginPage } from "./components/pages/auth/login";
import { SignupPage } from "./components/pages/auth/register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import ProfilePage from "./components/pages/profile";
import CreateWorkoutPage from "./components/pages/workouts/create";
import WorkoutHistoryPage from "./components/pages/workouts/history";
import WorkoutDetailsPage from "./components/pages/workouts/details";
import { AuthProvider } from "./utils/context/auth-provider";

const App = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
    });
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthProvider>
                    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<HomePage />} />
                                <Route path="profile" element={<ProfilePage />} />
                                <Route path="workouts">
                                    <Route path="create" element={<CreateWorkoutPage />} />
                                    <Route index element={<WorkoutHistoryPage />} />
                                    <Route path=":workoutId" element={<WorkoutDetailsPage />} />
                                </Route>
                            </Route>
                            <Route path="auth">
                                <Route path="login" element={<LoginPage />} />
                                <Route path="signup" element={<SignupPage />} />
                            </Route>
                        </Routes>
                        <Toaster />
                    </ThemeProvider>
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
};

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
