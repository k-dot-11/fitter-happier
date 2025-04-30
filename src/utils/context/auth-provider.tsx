import { removeAuthToken, removeRefreshToken } from "@/services/utils";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext<any>({
    user: null,
    setUser: () => {},
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const logout = () => {
        removeRefreshToken();
        removeAuthToken();
        setUser(null);
        navigate("/auth/login");
    };

    return <AuthContext.Provider value={{ user, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
