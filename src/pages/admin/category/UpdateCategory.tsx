
import { Form, Input, message, Modal, type FormProps, type UploadFile } from 'antd';
import MySelect from '../../../components/MySelect';
import TextArea from 'antd/es/input/TextArea';
import { useUpdateCategory } from '../../../hooks/useCategory';
import { useCallback, useEffect, useState, memo, useMemo } from 'react';
import MyUploadFile from '../../../components/MyUploadFile';
interface UpdateCategoryProps {
    isUpdateOpen: boolean,
    updatedCategory: Category | undefined,
    closeUpdateModal: () => void
    categoryOpt: {
        value: number | undefined;
        label: string;
    }[] | undefined
}
const UpdateCategory = ({ isUpdateOpen, closeUpdateModal, updatedCategory, categoryOpt }: UpdateCategoryProps) => {
    const categorySelectOpt = useMemo(() => [
        { value: 0, label: "No parent" },
        ...(categoryOpt?.filter((value) => value.value !== updatedCategory?.id) ?? [])
    ], [categoryOpt, updatedCategory])
    const { mutate: updateCategory, isPending } = useUpdateCategory();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage();
    const handleCancel = useCallback(() => {
        form.resetFields();
        setFileList([])
        closeUpdateModal()
    }, [form, closeUpdateModal]);
    // thuc chat handleCancel se luon khong thay doi
    const onFinish: FormProps<Category>['onFinish'] = useCallback((values: Category) => {
        updateCategory({
            id: updatedCategory?.id || 0,
            name: values.name,
            description: values.description,
            image: fileList[0].originFileObj,
            parentId: values.parentId,
        },
            {
                onSuccess: () => {
                    handleCancel();
                    messageApi.success("Update categories success");
                },
                onError: (error) => {
                    messageApi.error(error.message)
                },
            }
        );
    }, [updatedCategory, fileList, handleCancel, messageApi, updateCategory]);
    // thuc chat deps chi co updatedCategory, image
    useEffect(() => {
        form.setFieldsValue({
            name: updatedCategory?.name,
            parentId: updatedCategory?.parentId,
            description: updatedCategory?.description
        })
        setFileList([
            {
                uid: '-1',
                name: 'category.png',
                status: 'done',
                url: updatedCategory?.imageUrl,
            },
        ])
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
                okText="Update"
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
                            rows={5}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default memo(UpdateCategory);