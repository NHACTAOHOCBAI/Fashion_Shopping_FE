import { Button, Form, Input, message } from "antd"
import { useRegister } from "../../hooks/useAuth"
import { Link, useNavigate } from "react-router"
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

                        <Form.Item label={null} className="flex justify-center mt-[70px]">
                            <Button loading={isPending} type="primary" className="text-[14px] p-[20px] w-[300px] font-medium rounded-xl" htmlType="submit">
                                Sign Up
                            </Button>
                        </Form.Item>
                        <div className="text-[14px]">
                            Already have an account? <Link to="/login" className="underline text-accent-pinkRed font-medium cursor-pointer">Login here</Link>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}
export default Register