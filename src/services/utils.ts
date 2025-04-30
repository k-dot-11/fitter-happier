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

export const getRefreshToken = (): string | null => {
    if (typeof window === undefined) return null;
    return localStorage.getItem("refresh-token");
};

export const setRefreshToken = (refreshToken: string): void => {
    if (typeof window === undefined) return;
    localStorage.setItem("refresh-token", refreshToken);
};

export const removeRefreshToken = (): void => {
    if (typeof window === "undefined") return; // Ensure this runs only in the browser
    localStorage.removeItem("refresh-token");
};
