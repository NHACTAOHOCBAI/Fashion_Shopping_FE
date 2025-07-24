import { useMutation } from "@tanstack/react-query"
import { login, register, verifyEmail } from "../services/auth"

const useLogin = () => {
    return useMutation({
        mutationFn: login
    })
}
const useRegister = () => {
    return useMutation({
        mutationFn: register
    })
}
const useVerifyEmail = () => {
    return useMutation({
        mutationFn: verifyEmail
    })
}
export { useLogin, useRegister, useVerifyEmail }