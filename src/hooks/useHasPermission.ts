import { useAuth } from "../context/AuthProvider"

const useHasPermission = (roles: string[]) => {
    const { user } = useAuth();
    if (user === null)
        return false;
    return roles.includes(user.role)
}
export default useHasPermission