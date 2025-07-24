import { Button, Divider, Form, Input, message } from "antd"
import { useRegister } from "../../hooks/useAuth"
import { Link, useNavigate } from "react-router"
import LoginGoogleButton from "../../components/MyGoogleButton"
const Register = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const { mutate: register, isPending } = useRegister()
    const [messageApi, contextHolder] = message.useMessage();
    const handleSignUp = async (values: { email: string, password: string, name: string }) => {
        register(values,
            {
                onSuccess: () => {
                    form.resetFields();
                    messageApi.success("Register success")
                    navigate('/login')
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
                    <h1 className="text-text-heading font-bold text-[28px] text-center">Create an Account</h1>
                    <h2 className="text-[14px] text-center mb-[24px]">Please sign up here</h2>
                    <Form
                        form={form}
                        className="w-[400px]"
                        layout="vertical"
                        onFinish={handleSignUp}
                    >
                        <Form.Item
                            label={<p className="text-[14px]">Email :</p>}
                            name="email"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="example@gmai.com" disabled={isPending} className="h-[40px] text-[14px]" />
                        </Form.Item>

                        <Form.Item
                            label={<p className="text-[14px]">Password :</p>}
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password placeholder="123456" disabled={isPending} className="h-[40px] text-[14px]" />
                        </Form.Item>

                        <Form.Item
                            label={<p className="text-[14px]">Name :</p>}
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input placeholder="Peter" disabled={isPending} className="h-[40px] text-[14px]" />
                        </Form.Item>

                        <Form.Item label={null} className="flex justify-center mt-[20px]">
                            <Button loading={isPending} type="primary" className="text-[14px] p-[20px] w-[300px] font-medium rounded-xl" htmlType="submit">
                                Sign Up
                            </Button>
                        </Form.Item>
                        <Divider children={<div className="font-normal">Or sign in with</div>} />
                        <div className="flex justify-center">
                            <LoginGoogleButton
                                onSuccess={handleGGSuccess}
                                onError={handleGGFail} />
                        </div>
                        <div className="text-[14px] mt-[20px]">
                            Already have an account? <Link to="/login" className="underline hover:text-accent-pinkRed font-medium cursor-pointer">Login here</Link>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}
export default Register