import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, InputNumber, message, TreeSelect, type UploadFile } from "antd"
import MyUploadFile from "../../../components/MyUploadFile"
import TextArea from "antd/es/input/TextArea"
import MySelect from "../../../components/MySelect"
import { useSelectBrand } from "../../../hooks/useBrand"
import { useSelectCategory } from "../../../hooks/useCategory"
import { useCallback, useState } from "react"
import { formatPrice } from "../../../utils/formatPrice"
import { formatNumber } from '../../../utils/formatNumber';
import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { sizeSelect } from '../../../constants/size';
import { useCreateProduct } from '../../../hooks/useProduct';
const maxFile = import.meta.env.VITE_maxFile
const NewProduct = () => {
    const { data: categoryOpt } = useSelectCategory()
    const { data: brandOpt } = useSelectBrand()
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [fileLists, setFileLists] = useState<UploadFile[][]>([]);
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage();
    const { mutate: createProduct, isPending } = useCreateProduct()
    const handleAdd = useCallback(() => {
        const currentVariants = form.getFieldValue("variants") || [];
        form.setFieldsValue({ variants: [...currentVariants, {}] });
        setFileLists((prev) => [...prev, []]);
    }, [form])
    const handleRemove = useCallback((index: number, remove: (index: number) => void) => {
        remove(index);
        setFileLists((prev) => prev.filter((_, idx) => idx !== index));
    }, [])
    const reset = useCallback(() => {
        form.resetFields();
        setFileList([])
        setFileLists([])
    }, [form])
    const onFinish = useCallback((values: any) => {
        const images = fileLists.map((value) =>
            value[0].originFileObj
        )
        const thumbnails = fileList.map(values => values.originFileObj)
        const data = {
            name: values.name,
            images: thumbnails as File[],
            description: values.description,
            price: values.price,
            categoryId: values.categoryId,
            brandId: values.brandId,
            variants: values.variants,
            variant_images: images as File[]
        }
        createProduct(data,
            {
                onSuccess: () => {
                    reset()
                    messageApi.success("Create product success")
                },
                onError: (error) => {
                    messageApi.error(error.message)
                },
            },

        )
    }, [createProduct, fileList, fileLists, messageApi, reset])
    return (
        <>
            {contextHolder}
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
                            <Input disabled={isPending} placeholder='Enter name' />
                        </Form.Item>
                        <Form.Item
                            label="Thumbnail : "
                        >
                            <MyUploadFile
                                disabled={isPending}
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
                                    disabled={isPending}
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
                                    disabled={isPending}
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
                                disabled={isPending}
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
                                disabled={isPending}
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
                                                <CloseOutlined disabled={isPending} onClick={() => handleRemove(field.name, remove)} />
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
                                                        disabled={isPending}
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
                                                    <Input disabled={isPending} placeholder="Enter color" />
                                                </Form.Item>
                                            </div>

                                            <div className="mb-4">
                                                <label className="font-medium block mb-1">Image :</label>
                                                <MyUploadFile
                                                    disabled={isPending}
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
                                                name={[field.name, 'price']}
                                                rules={[{ required: true, message: 'Please input variant price!' }]}
                                            >
                                                <InputNumber
                                                    disabled={isPending}
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
                                                    disabled={isPending}
                                                    style={{ width: '100%' }}
                                                    placeholder="Enter quantity"
                                                    min={1}
                                                    formatter={(value) => formatNumber(value)}
                                                />
                                            </Form.Item>
                                        </Card>
                                    ))}

                                    <Button disabled={isPending} type="dashed" onClick={handleAdd} block>
                                        + Add Item
                                    </Button>
                                </div>
                            )}
                        </Form.List>
                    </div>
                </div>
            </Form>
            <div className='flex gap-[10px] mt-[20px] mb-[50px]'>
                <Button disabled={isPending} className='ml-auto' onClick={() => reset()}>Cancel</Button>
                <Button loading={isPending} type='primary' onClick={() => form.submit()}>Create</Button>
            </div>
        </>
    )
}
export default NewProduct