
import { Form, Input, message, Modal, type FormProps } from 'antd';
import MySelect from '../../../components/MySelect';
import TextArea from 'antd/es/input/TextArea';
import { useUpdateCategory } from '../../../hooks/useCategory';
import { useCallback, useEffect, useState, memo } from 'react';
import MyVisibleUpload from '../../../components/MyVisibileUpload';
interface UpdateCategoryProps {
    isUpdateOpen: boolean,
    updatedCategory: Category | undefined,
    closeUpdateModal: () => void
    categoryOpt: {
        value: number;
        label: string;
    }[] | undefined
}
const UpdateCategory = ({ isUpdateOpen, closeUpdateModal, updatedCategory, categoryOpt }: UpdateCategoryProps) => {
    const { mutate: updateCategory, isPending } = useUpdateCategory();
    const [image, setImage] = useState<File | undefined>(undefined);
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage();
    const handleCancel = useCallback(() => {
        form.resetFields();
        closeUpdateModal()
    }, [form, closeUpdateModal]);
    // thuc chat handleCancel se luon khong thay doi
    const onFinish: FormProps<Category>['onFinish'] = useCallback((values: Category) => {
        updateCategory({
            id: updatedCategory?.id || 0,
            name: values.name,
            description: values.description,
            image: image,
            parentId: values.parentId,
        },
            {
                onSuccess: () => {
                    handleCancel();
                    messageApi.success("Update categories success");
                },
                onError: () => {
                    messageApi.error("Update categories failed");
                },
            }
        );
    }, [updatedCategory, image, handleCancel, messageApi, updateCategory]);
    // thuc chat deps chi co updatedCategory, image
    useEffect(() => {
        form.setFieldsValue({
            name: updatedCategory?.name,
            parentId: updatedCategory?.parentId,
            description: updatedCategory?.description
        })
    }, [updatedCategory, form])
    return (
        <>
            {contextHolder}
            <Modal
                title="Edit Category"
                open={isUpdateOpen}
                onOk={() => form.submit()}
                onCancel={handleCancel}
                loading={isPending}
            >
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
                        <Input placeholder='Shoulder bags...' />
                    </Form.Item>
                    <Form.Item<Category>
                        label="Parent Category : "
                        name="parentId"
                    >
                        <MySelect
                            showSearch
                            placeholder="Bags..."
                            options={categoryOpt}
                        />
                    </Form.Item>
                    <Form.Item<Category>
                        label="Image : "
                        name="imageUrl"
                    >
                        <MyVisibleUpload
                            initialImageUrl={updatedCategory?.imageUrl}
                            onChange={(file) => setImage(file)}
                        />
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
            </Modal>
        </>
    );
};

export default memo(UpdateCategory);