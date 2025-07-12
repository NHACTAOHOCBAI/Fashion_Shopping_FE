import type { FormProps, UploadFile } from 'antd';
import { Button, Form, Input, message } from 'antd';
import MySelect from '../../../components/MySelect';
import TextArea from 'antd/es/input/TextArea';
import MyUploadFile from '../../../components/MyUploadFile';
import React, { useCallback, useState } from 'react';
import { SquarePlus } from 'lucide-react';
import { useCreateCategory } from '../../../hooks/useCategory';
const NewCategory = () => {
    const { mutate: createCategory, isPending } = useCreateCategory();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish: FormProps<Category>['onFinish'] = useCallback((values: Category) => {
        createCategory({
            name: values.name,
            description: values.description,
            image: fileList[0]?.originFileObj,
            parentId: values.parentId,
        },
            {
                onSuccess: () => {
                    form.resetFields();
                    messageApi.success("Create categories success")
                },
                onError: () => {
                    messageApi.error("Create categories failed")
                },
            },

        )
    }, [createCategory, fileList, form, messageApi])
    // thuc chat deps chi co fileList

    return (
        <>
            {contextHolder}
            <div className='bg-white p-[10px] rounded-lg border'>
                <h2 className='text-accent-pinkRed font-bold text-[16px] mb-[5px] flex gap-[10px]'><SquarePlus strokeWidth={1.75} /> Add New Category</h2>
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
                            disabled={isPending}
                            placeholder="Bags..."
                            options={[
                                { value: 1, label: 'Apple' },
                                { value: 2, label: 'Banana' },
                                { value: undefined, label: 'No parent' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item<Category>
                        label="Image : "
                        name="imageUrl"
                    >
                        <MyUploadFile disabled={isPending} onFileListChange={setFileList} />
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
                <Button loading={isPending} className='ml-auto block mt-auto' type="primary" onClick={() => form.submit()}>Create</Button>
            </div>
        </>
    )
}

export default React.memo(NewCategory) 