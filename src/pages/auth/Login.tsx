import { Button, Checkbox, Form, Input } from "antd"

const Login = () => {
    return (
        <div
            className=" h-screen bg-no-repeat bg-cover bg-center flex justify-center items-center"
            style={{ backgroundImage: `url("/auth_background.png")` }}
        >
            <div className="bg-white p-[50px] rounded-3xl">
                <h1 className="text-text-heading font-bold text-[28px] text-center">Login to Account</h1>
                <h2 className="text-[14px] text-center mb-[24px]">Please enter your email and password to countinue</h2>
                <Form
                    className="w-[400px]"
                    layout="vertical"
                >
                    <Form.Item
                        label={<p className="text-[14px]">Email :</p>}
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input className="h-[40px] text-[14px]" />
                    </Form.Item>

                    <Form.Item
                        label={<p className="text-[14px]">Password :</p>}
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password className="h-[40px] text-[14px]" />
                    </Form.Item>

                    <div className="flex justify-between  items-center">
                        <Form.Item name="remember" valuePropName="checked" label={null}>
                            <Checkbox className="text-[14px]">Remember me</Checkbox>
                        </Form.Item>
                        <Form.Item name="nothing" >
                            <p className="text-[14px]">
                                Forget password?
                            </p>
                        </Form.Item>
                    </div>

                    <Form.Item label={null} className="flex justify-center">
                        <Button type="primary" className="text-[14px] p-[20px] w-[300px] font-medium rounded-xl" htmlType="submit">
                            Sign in
                        </Button>
                    </Form.Item>
                    <div className="text-[14px]">
                        Don't have an account? <span className="underline text-accent-pinkRed font-medium cursor-pointer">Sign up here</span>
                    </div>
                </Form>
            </div>
        </div>

    )
}
export default Login