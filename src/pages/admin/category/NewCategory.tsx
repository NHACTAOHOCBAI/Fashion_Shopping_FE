import type { FormProps, UploadFile } from 'antd';
import { Button, Form, Input, message } from 'antd';
import MySelect from '../../../components/MySelect';
import TextArea from 'antd/es/input/TextArea';
import React, { useCallback, useMemo, useState } from 'react';
import { useCreateCategory } from '../../../hooks/useCategory';
import MyUploadFile from '../../../components/MyUploadFile';
interface NewCategoryProps {
    categoryOpt: {
        value: number;
        label: string;
    }[] | undefined
}
const NewCategory = ({ categoryOpt }: NewCategoryProps) => {
    const categorySelectOpt = useMemo(() => [
        { value: undefined, label: "No parent" },
        ...(categoryOpt ?? [])
    ], [categoryOpt])
    const { mutate: createCategory, isPending } = useCreateCategory();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage();
    const handleCancel = useCallback(() => {
        form.resetFields();
        setFileList([])
    }, [form]);
    const onFinish: FormProps<Category>['onFinish'] = useCallback((values: Category) => {
        createCategory({
            name: values.name,
            description: values.description,
            image: fileList[0]?.originFileObj,
            parentId: values.parentId,
        },
            {
                onSuccess: () => {
                    handleCancel()
                    messageApi.success("Create categories success")
                },
                onError: (error) => {
                    messageApi.error(error.message)
                },
            },

        )
    }, [createCategory, fileList, handleCancel, messageApi])
    // thuc chat deps chi co fileList

    return (
        <>
            {contextHolder}
            <div className='bg-white p-[14px] rounded-lg border'>
                <h2 className=' font-medium text-[14px] mb-[5px] flex gap-[10px]'>New Category</h2>
                <Form
                    form={form}
                    layout='vertical'
                    initialValues={{ remember: true }}
                    onFinish={onFinish}

                >
                    <Form.Item<Category>
                        label="Category Name : "
                        name="name"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input disabled={isPending} placeholder='Shoulder bags...' />
                    </Form.Item>
                    <Form.Item<Category>
                        label="Parent Category : "
                        name="parentId"
                    >
                        <MySelect
                            showSearch
                            disabled={isPending}
                            placeholder="Bags..."
                            options={categorySelectOpt}
                        />
                    </Form.Item>
                    <Form.Item<Category>
                        label="Image : "
                        name="imageUrl"
                    >
                        <MyUploadFile
                            disabled={isPending}
                            quantity={1}
                            setFileList={setFileList}
                            fileList={fileList} />
                    </Form.Item>
                    <Form.Item<Category>
                        label="Desciption : "
                        name="description"
                    >
                        <TextArea
                            disabled={isPending}
                            rows={5}
                        />
                    </Form.Item>

                </Form>
                <div className='flex gap-[10px]'>
                    <Button disabled={isPending} className='ml-auto' onClick={() => handleCancel()}>Cancel</Button>
                    <Button loading={isPending} type="primary" onClick={() => form.submit()}>Create</Button>
                </div>
            </div>
        </>
    )
}

export default React.memo(NewCategory) 