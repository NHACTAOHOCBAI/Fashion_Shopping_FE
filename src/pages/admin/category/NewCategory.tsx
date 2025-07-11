import type { FormProps, UploadFile } from 'antd';
import { Button, Form, Input } from 'antd';
import MySelect from '../../../components/MySelect';
import TextArea from 'antd/es/input/TextArea';
import MyUploadFile from '../../../components/MyUploadFile';
import { useState } from 'react';
import { SquarePlus } from 'lucide-react';
const onFinish: FormProps<Category>['onFinish'] = (values) => {
    console.log('Success:', values);
};
const NewCategory = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm()
    return (
        <div className='bg-white p-[10px] rounded-lg border'>
            <h2 className='text-accent-pinkRed font-bold text-[16px] mb-[5px] flex gap-[10px]'><SquarePlus strokeWidth={1.75} /> Add New Category</h2>
            <Form
                form={form}
                layout='vertical'
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item<Category>
                    label="Category Name : "
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<Category>
                    label="Parent Category : "
                    name="parentId"
                >
                    <MySelect
                        options={[
                            { value: 'apple', label: 'Apple' },
                            { value: 'banana', label: 'Banana' },
                        ]}
                    />
                </Form.Item>
                <Form.Item<Category>
                    label="Parent Category : "
                    name="image"
                >
                    <MyUploadFile onFileListChange={setFileList} />
                </Form.Item>
                <Form.Item<Category>
                    label="Desciption : "
                    name="description"
                >
                    <TextArea
                        rows={5}
                    />
                </Form.Item>

            </Form>
            <Button className='ml-auto block mt-auto' type="primary">Create</Button>
        </div>
    )
}

export default NewCategory;