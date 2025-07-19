/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react"
interface AuthContextType {
    user: User | null;
    login: (userData: User, accessToken: string) => void;
    logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const login = (userData: User, accessToken: string) => {
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
        localStorage.setItem("accessToken", accessToken)
    }
    const logout = () => {
        setUser(null)
        localStorage.removeItem("user")
        localStorage.removeItem("accessToken")
    }
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
    }, [])
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext) as AuthContextType