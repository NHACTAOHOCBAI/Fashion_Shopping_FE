import { Form, Input, InputNumber, type UploadFile } from "antd"
import MyUploadFile from "../../../components/MyUploadFile"
import TextArea from "antd/es/input/TextArea"
import MySelect from "../../../components/MySelect"
import { useSelectBrand } from "../../../hooks/useBrand"
import { useSelectCategory } from "../../../hooks/useCategory"
import { useState } from "react"
const maxFile = import.meta.env.VITE_maxFile
const NewProduct = () => {
    const { data: categoryOpt } = useSelectCategory()
    const { data: brandOpt } = useSelectBrand()
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm()
    const onFinish = (values: any) => {
        console.log(values)
    }
    return (
        <div>
            <h1 className='font-medium text-[14px] text-text-heading '>Add New Product</h1>
            <div className="flex gap-[10px]">
                <div className='flex-[4] bg-white p-[14px] rounded-lg border mt-[10px]'>
                    <h2 className='font-medium text-[14px] mb-[10px] '>Basic Details</h2>
                    <Form
                        form={form}
                        layout='vertical'
                        initialValues={{ remember: true }}
                        onFinish={onFinish}

                    >
                        <Form.Item
                            label="Product Name : "
                            name="name"
                            rules={[{ required: true, message: 'Please input product name!' }]}
                        >
                            <Input placeholder='Enter name' />
                        </Form.Item>
                        <Form.Item
                            label="Thumbnail : "
                        >
                            <MyUploadFile
                                quantity={maxFile}
                                setFileList={setFileList}
                                fileList={fileList} />
                        </Form.Item>
                        <div className="flex gap-[10px] justify-between">
                            <Form.Item
                                className="flex-[1]"
                                label="Category : "
                                name="parentId"
                                rules={[{ required: true, message: 'Please select category of the product!' }]}
                            >
                                <MySelect
                                    showSearch
                                    placeholder="Select category"
                                    options={categoryOpt}
                                />
                            </Form.Item>
                            <Form.Item
                                className="flex-[1]"
                                label="Brand : "
                                name="brandId"
                                rules={[{ required: true, message: 'Please select brand of the product!' }]}
                            >
                                <MySelect
                                    showSearch
                                    placeholder="Select brand"
                                    options={brandOpt}
                                />
                            </Form.Item>
                        </div>
                        <Form.Item
                            label="Product price :"
                            name="price"
                            rules={[{ required: true, message: 'Please input product price!' }]}
                        >
                            <InputNumber
                                placeholder="Enter price"
                                style={{ width: '100%' }}
                                min={0}
                                step={0.01} // Cho phép nhập số thập phân
                                formatter={(value) =>
                                    new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    }).format(Number(value || 0))
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            label="Description : "
                            name="description"
                        >
                            <TextArea
                                placeholder="Enter description"
                                rows={5}
                            />
                        </Form.Item>

                    </Form>
                </div>
                <div className='flex-[3] bg-white p-[14px] rounded-lg border mt-[10px]'>

                </div>
            </div>
        </div>
    )
}
export default NewProduct