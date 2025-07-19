import { useLocation } from "react-router"
import { useVerifyEmail } from "../../hooks/useAuth"
import { useEffect } from "react";

const VerifyEmail = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const { mutate, isPending, isSuccess, error } = useVerifyEmail()
    useEffect(() => {
        if (token) {
            mutate({ token })
        }
    }, [token, mutate])
    return (
        <div className="p-4">
            {isPending && <p>Verifying email...</p>}
            {isSuccess && <p>Verify email success</p>}
            {error && <p> Verification failed : {(error as any)?.message || "Lỗi không xác định"}</p>}
        </div>
    )
}
export default VerifyEmail