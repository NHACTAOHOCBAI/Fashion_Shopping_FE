import type React from "react";
import { useAuth } from "../context/AuthProvider";
import UnauthorizedPage from "./UnauthorizedPage";
import ForbiddenPage from "./Forbidden";

const ProtectedRoute = ({ children, allowRoles }: { children: React.ReactNode, allowRoles: string[] }) => {
    const { user } = useAuth()
    if (user === null) {
        return <UnauthorizedPage />
    }
    if (!allowRoles.includes(user?.role as string)) {
        return <ForbiddenPage />
    }
    return { children }
}
export default ProtectedRoute