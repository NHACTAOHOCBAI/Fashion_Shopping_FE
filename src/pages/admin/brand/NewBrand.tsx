import type { FormProps, UploadFile } from 'antd';
import { Button, Form, Input, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useCallback, useState } from 'react';
import { useCreateBrand } from '../../../hooks/useBrand';
import MyUploadFile from '../../../components/MyUploadFile';
const NewBrand = () => {
    const { mutate: createBrand, isPending } = useCreateBrand();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish: FormProps<Brand>['onFinish'] = useCallback((values: Brand) => {
        createBrand({
            name: values.name,
            description: values.description,
            logo: fileList[0]?.originFileObj,
        },
            {
                onSuccess: () => {
                    form.resetFields();
                    messageApi.success("Create brand success")
                },
                onError: (error) => {
                    messageApi.error(error.message)
                },
            },

        )
    }, [createBrand, fileList, form, messageApi])
    // thuc chat deps chi co fileList

    return (
        <>
            {contextHolder}
            <div className='bg-white p-[14px] rounded-lg border'>
                <h2 className=' font-medium text-[14px] mb-[5px] flex gap-[10px]'>New Brand</h2>
                <Form
                    form={form}
                    layout='vertical'
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item<Brand>
                        label="Brand Name : "
                        name="name"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input disabled={isPending} placeholder='Shoulder bags...' />
                    </Form.Item>
                    <Form.Item<Brand>
                        label="Logo : "
                        name="logoUrl"
                    >
                        <MyUploadFile
                            disabled={isPending}
                            quantity={1}
                            setFileList={setFileList}
                            fileList={fileList} />
                    </Form.Item>
                    <Form.Item<Brand>
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

export default React.memo(NewBrand) 