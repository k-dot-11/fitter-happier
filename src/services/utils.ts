export const getAuthToken = (): string | null => {
    if (typeof window === "undefined") return null; // Ensure this runs only in the browser
    return localStorage.getItem("auth-token");
};

export const setAuthToken = (token: string): void => {
    if (typeof window === "undefined") return; // Ensure this runs only in the browser
    localStorage.setItem("auth-token", token);
};

export const removeAuthToken = (): void => {
    if (typeof window === "undefined") return; // Ensure this runs only in the browser
    localStorage.removeItem("auth-token");
};

