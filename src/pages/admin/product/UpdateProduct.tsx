import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, InputNumber, TreeSelect, type UploadFile } from "antd"
import MyUploadFile from "../../../components/MyUploadFile"
import TextArea from "antd/es/input/TextArea"
import MySelect from "../../../components/MySelect"
import { useSelectBrand } from "../../../hooks/useBrand"
import { useSelectCategory } from "../../../hooks/useCategory"
import { useState } from "react"
import { formatPrice } from "../../../utils/formatPrice"
import { formatNumber } from '../../../utils/formatNumber';
import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { sizeSelect } from '../../../constants/size';
const maxFile = import.meta.env.VITE_maxFile
const UpdateProduct = () => {
    const { data: categoryOpt } = useSelectCategory()
    const { data: brandOpt } = useSelectBrand()
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [fileLists, setFileLists] = useState<UploadFile[][]>([]);
    const [form] = Form.useForm()
    const handleAdd = () => {
        const currentVariants = form.getFieldValue("variants") || [];
        form.setFieldsValue({ variants: [...currentVariants, {}] });
        setFileLists((prev) => [...prev, []]);
    };
    const handleRemove = (index: number, remove: (index: number) => void) => {
        remove(index);
        setFileLists((prev) => prev.filter((_, idx) => idx !== index));
    };
    const onFinish = (values: any) => {
        const images = fileLists.map((value) =>
            value[0].originFileObj
        )
        const thumbnails = fileList.map(values => values.originFileObj)
        const data = {
            name: values.name,
            thumbnails: thumbnails,
            description: values.description,
            price: values.price,
            categoryId: values.categoryId,
            brandId: values.brandId,
            variants: values.variants,
            images: images
        }
        console.log(data)
    }
    return (
        <div>
            <h1 className='font-medium text-[14px] text-text-heading flex items-center'>
                <Link to="/admin/products" className='text-zinc-300'>Products</Link>
                <ChevronRight size={20} className='text-zinc-300' />
                Add New Product</h1>
            <Form
                form={form}
                layout='vertical'
                initialValues={{ remember: true }}
                onFinish={onFinish}

            >
                <div className='flex gap-[10px]'>
                    <div className='flex-[4] bg-white p-[14px] rounded-lg border mt-[10px]'>
                        <h2 className='font-medium text-[14px] mb-[10px] '>Basic Details</h2>
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
                                name="categoryId"
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
                                    formatPrice(value as number)
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

                    </div>
                    <div className='flex-[3] border-dashed p-[14px] rounded-lg border mt-[10px]'>
                        <Form.List name="variants">
                            {(fields, { remove }) => (
                                <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                                    {fields.map((field) => (
                                        <Card
                                            size="small"
                                            title={`Variant ${field.name + 1}`}
                                            key={field.key}
                                            extra={
                                                <CloseOutlined onClick={() => handleRemove(field.name, remove)} />
                                            }
                                        >
                                            <div className="flex gap-[10px] justify-between">
                                                <Form.Item
                                                    className="flex-[1]"
                                                    label="Size :"
                                                    name={[field.name, 'size']}
                                                    rules={[{ required: true, message: 'Please input size!' }]}
                                                >
                                                    <TreeSelect
                                                        virtual={false}
                                                        showSearch
                                                        style={{ width: '100%' }}
                                                        placeholder="Please select"
                                                        allowClear
                                                        treeDefaultExpandAll
                                                        treeData={sizeSelect}
                                                    />

                                                </Form.Item>
                                                <Form.Item
                                                    className="flex-[1]"
                                                    label="Color :"
                                                    name={[field.name, 'color']}
                                                    rules={[{ required: true, message: 'Please input color!' }]}
                                                >
                                                    <Input placeholder="Enter color" />
                                                </Form.Item>
                                            </div>

                                            <div className="mb-4">
                                                <label className="font-medium block mb-1">Image :</label>
                                                <MyUploadFile
                                                    quantity={1}
                                                    fileList={fileLists[field.name] || []}
                                                    setFileList={(newList) => {
                                                        const updated = [...fileLists];
                                                        updated[field.name] = newList;
                                                        setFileLists(updated);
                                                    }}
                                                />
                                            </div>

                                            <Form.Item
                                                label="Variant price :"
                                                name={[field.name, 'variantPrice']}
                                                rules={[{ required: true, message: 'Please input variant price!' }]}
                                            >
                                                <InputNumber
                                                    placeholder="Enter price"
                                                    style={{ width: '100%' }}
                                                    min={0}
                                                    step={0.01}
                                                    formatter={(value) => formatPrice(value)}
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                label="Quantity :"
                                                name={[field.name, 'quantity']}
                                                rules={[{ required: true, message: 'Please input quantity!' }]}
                                            >
                                                <InputNumber
                                                    style={{ width: '100%' }}
                                                    placeholder="Enter quantity"
                                                    min={1}
                                                    formatter={(value) => formatNumber(value)}
                                                />
                                            </Form.Item>
                                        </Card>
                                    ))}

                                    <Button type="dashed" onClick={handleAdd} block>
                                        + Add Item
                                    </Button>
                                </div>
                            )}
                        </Form.List>
                    </div>
                </div>
            </Form>
            <div className='flex gap-[10px] mt-[20px] mb-[50px]'>
                <Button className='ml-auto' onClick={() => form.resetFields()}>Cancel</Button>
                <Button type='primary' onClick={() => form.submit()}>Create</Button>
            </div>
        </div>
    )
}
export default UpdateProduct