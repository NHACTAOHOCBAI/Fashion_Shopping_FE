import type { FormInstance } from "antd"
import { useEffect } from "react"

const useRememberMe = ({ form }: { form: FormInstance<any> }) => {
    const rememberAccount = (values: { email: string, password: string, remember: boolean }) => {
        if (values.remember) {
            localStorage.setItem("email", values.email)
            localStorage.setItem("password", values.password)
        }
    }
    useEffect(() => {
        const email = localStorage.getItem("email")
        const password = localStorage.getItem("password")
        if (email && password) {
            form.setFieldsValue({
                email: email,
                password: password
            })
        }
    }, [form])
    return { rememberAccount }
}
export default useRememberMe