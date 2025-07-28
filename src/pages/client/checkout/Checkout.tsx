import { Avatar, Divider, Form, Input, Radio, Select } from "antd"
import { UserIcon } from "lucide-react"



const Checkout = () => {
    const [form] = Form.useForm()
    return (
        <Form
            className=" flex "
            form={form}
            layout='vertical'
        >
            <div className="flex-[1] py-[50px] px-[40px] pl-[80px]">
                <div>
                    <h2 className="text-text-heading font-semibold text-[18px] py-[10px]">Delivery Information</h2>
                    <div className="flex gap-[10px] items-center mb-[20px]">
                        <Avatar icon={<UserIcon />} shape="square" className="w-[50px] h-[50px]"></Avatar>
                        <div>
                            <p>Toji2k5@gmail.com</p>
                            <p>Phuc Nguyen</p>
                        </div>
                    </div>
                    <Form.Item

                        name="name"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input className="h-[40px]" placeholder='Enter name' />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input className="h-[40px]" placeholder='Enter phone' />
                    </Form.Item>
                    <div className="flex  gap-[10px]">
                        <Form.Item
                            className="flex-[1]"
                            name="city"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Select className="h-[40px]" placeholder='Select province/city' />
                        </Form.Item>
                        <Form.Item
                            className="flex-[1]"
                            name="Dicstrict"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Select className="h-[40px]" placeholder='Select dicstrict' />
                        </Form.Item>
                    </div>
                    <Form.Item
                        name="address"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input className="h-[40px]" placeholder='Enter detail address' />
                    </Form.Item>
                </div>
                <div>
                    <h2 className="text-text-heading font-semibold text-[18px] py-[10px]">Payment Method</h2>
                    <Form.Item
                        name="paymentMethod"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Radio.Group
                            className="flex flex-col  gap-[10px]"
                            options={paymentOpts}
                        />
                    </Form.Item>
                </div>
                <div className="bg-black rounded-lg py-[10px] px-[15px] font-bold text-white w-fit hover:bg-yellow-100 hover:text-black duration-500 border-black border-[1px] cursor-pointer ml-auto">Place Order</div>
            </div>

            <div className="flex-[1] bg-gray-50 py-[50px] px-[40px] pr-[80px]">
                <CheckoutItems />
                <CheckoutItems />
                <Form.Item
                    className="pt-[20px]"
                    name="discount"
                >
                    <Input className="h-[40px]" placeholder='Enter discount' />
                </Form.Item>
                <FeeItem
                    value={180}
                    name={"Subtotal"}
                />
                <FeeItem
                    value={10}
                    name={"Shipping"}
                />
                <FeeItem
                    type="subtract"
                    value={20}
                    name={"Discount"}
                />
                <Divider className="m-[0px]" />
                <TotalPrice />
            </div>

        </Form>

    )
}
const CheckoutItems = () => {
    return (
        <div className="flex justify-between p-[10px] border-b-[1px] items-center">
            <div className="flex gap-[25px] items-center">
                <img className="aspect-[5/3] object-contain border  w-[100px]" src="https://i.pinimg.com/736x/0a/6c/8a/0a6c8af6388b24b008890992d6b5bb90.jpg" alt="" />
                <div>
                    <p className="text-text-heading font-semibold text-[16px]">Yuta shirt</p>
                    <p>quantity : 2</p>
                </div>
            </div>
            <p className="text-text-heading font-semibold text-[16px]">$ 180</p>
        </div>
    )
}
const TotalPrice = () => {
    return (
        <div className="flex items-center justify-between p-[10px]">
            <p className="font-bold">Total : </p>
            <p className="text-text-heading font-bold text-[24px]">$ 170</p>
        </div>
    )
}
const FeeItem = ({ name, value, type = "plus" }: { name: string, value: number, type?: 'plus' | 'subtract' }) => {
    const result = type === "plus" ? `$ ${value}` : `-$ ${value}`
    return (
        <div className="flex items-center justify-between p-[10px]">
            <p>{name} : </p>
            <p className="text-text-heading font-semibold text-[16px]">{result}</p>
        </div>
    )
}
const paymentOpts = [
    {
        value: '1',
        label: <div className=" border rounded p-[10px]">
            Cash on Delivery
        </div>
    },
    {
        value: '2',
        label: <div className=" border rounded p-[10px]">
            Bank Transfer
        </div>
    },
]
export default Checkout