import { useMutation } from "@tanstack/react-query"
import { login, register } from "../services/auth"

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
export { useLogin, useRegister }