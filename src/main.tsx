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

const App = () => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<HomePage />} />
                        </Route>
                        <Route path="auth">
                            <Route path="login" element={<LoginPage />} />
                            <Route path="signup" element={<SignupPage />} />
                        </Route>
                    </Routes>
                    <Toaster />
                </BrowserRouter>
            </ThemeProvider>
        </QueryClientProvider>
    );
};

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
