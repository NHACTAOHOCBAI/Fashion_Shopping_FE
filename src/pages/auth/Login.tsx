import { Button, Checkbox, Divider, Form, Input, message } from "antd"
import { useLogin } from "../../hooks/useAuth"
import { Link, useNavigate } from "react-router"
import useRememberMe from "../../hooks/useRememberMe"
import { useAuth } from "../../context/AuthProvider"
import LoginGoogleButton from "../../components/MyGoogleButton"
const Login = () => {
    const { login: authLogin } = useAuth();
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const { rememberAccount } = useRememberMe({ form })
    const [messageApi, contextHolder] = message.useMessage();
    const { mutate: login, isPending } = useLogin()
    const handleLogin = async (values: { email: string, password: string, remember: boolean }) => {
        login({ email: values.email, password: values.password },
            {
                onSuccess: (data: { user: User, accessToken: string }) => {
                    rememberAccount(values)
                    authLogin(data.user, data.accessToken)
                    form.resetFields();
                    messageApi.success("Login success")
                    navigate('/admin/categories')
                },
                onError: (error: any) => {
                    messageApi.error(error?.message)
                },
            },)
    }
    const handleGGSuccess = () => {
        messageApi.success("Login success")
        navigate('/admin/categories')
    }
    const handleGGFail = (error: string) => {
        messageApi.error(error)
    }
    return (
        <>
            {contextHolder}
            <div
                className=" h-screen bg-no-repeat bg-cover bg-center flex justify-center items-center"
                style={{ backgroundImage: `url("/auth_background.png")` }}
            >
                <div className="bg-white p-[50px] rounded-3xl">
                    <h1 className="text-text-heading font-bold text-[28px] text-center">Login to Account</h1>
                    <h2 className="text-[14px] text-center mb-[24px]">Please enter your email and password to countinue</h2>
                    <Form
                        form={form}
                        className="w-[400px]"
                        layout="vertical"
                        onFinish={handleLogin}
                    >
                        <Form.Item
                            label={<p className="text-[14px]">Email :</p>}
                            name="email"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input disabled={isPending} className="h-[40px] text-[14px]" />
                        </Form.Item>

                        <Form.Item
                            label={<p className="text-[14px]">Password :</p>}
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password disabled={isPending} className="h-[40px] text-[14px]" />
                        </Form.Item>

                        <div className="flex justify-between  items-center">
                            <Form.Item name="remember" valuePropName="checked" label={null}>
                                <Checkbox disabled={isPending} className="text-[14px]">Remember me</Checkbox>
                            </Form.Item>
                            <Form.Item name="nothing" >
                                <p className="text-[14px] cursor-pointer duration-300 hover:text-accent-pinkRed">
                                    Forget password?
                                </p>
                            </Form.Item>
                        </div>
                        <Form.Item label={null} className="flex justify-center">
                            <Button loading={isPending} type="primary" className="text-[14px] p-[20px] w-[300px] font-medium rounded-xl" htmlType="submit">
                                Sign In
                            </Button>
                        </Form.Item>
                        <Divider children={<div className="font-normal">Or sign in with</div>} />
                        <div className="flex justify-center">
                            <LoginGoogleButton
                                onSuccess={handleGGSuccess}
                                onError={handleGGFail} />
                        </div>
                        <div className="text-[14px]  mt-[20px]">
                            Don't have an account? <Link to="/register" className="underline hover:text-accent-pinkRed font-medium cursor-pointer">Sign up here</Link>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}
export default Login