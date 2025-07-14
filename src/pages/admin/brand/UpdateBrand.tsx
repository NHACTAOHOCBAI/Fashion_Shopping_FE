
import { Form, Input, message, Modal, type FormProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useUpdateBrand } from '../../../hooks/useBrand';
import { useCallback, useEffect, useState, memo } from 'react';
import MyVisibleUpload from '../../../components/MyVisibileUpload';
interface UpdateBrandProps {
    isUpdateOpen: boolean,
    updatedBrand: Brand | undefined,
    closeUpdateModal: () => void
}
const UpdateBrand = ({ isUpdateOpen, closeUpdateModal, updatedBrand }: UpdateBrandProps) => {
    const { mutate: updateBrand, isPending } = useUpdateBrand();
    const [image, setImage] = useState<File | undefined>(undefined);
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage();
    const handleCancel = useCallback(() => {
        form.resetFields();
        closeUpdateModal()
    }, [form, closeUpdateModal]);
    // thuc chat handleCancel se luon khong thay doi
    const onFinish: FormProps<Brand>['onFinish'] = useCallback((values: Brand) => {
        updateBrand({
            id: updatedBrand?.id || 0,
            name: values.name,
            description: values.description,
            logoUrl: image,
        },
            {
                onSuccess: () => {
                    handleCancel();
                    messageApi.success("Update brand success");
                },
                onError: () => {
                    messageApi.error("Update brand failed");
                },
            }
        );
    }, [updatedBrand, image, handleCancel, messageApi, updateBrand]);
    // thuc chat deps chi co updatedBrand, image
    useEffect(() => {
        form.setFieldsValue({
            name: updatedBrand?.name,
            description: updatedBrand?.description
        })
    }, [updatedBrand, form])
    return (
        <>
            {contextHolder}
            <Modal
                title="Edit Brand"
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
                    <Form.Item<Brand>
                        label="Brand Name : "
                        name="name"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input placeholder='Shoulder bags...' />
                    </Form.Item>
                    <Form.Item<Brand>
                        label="Logo : "
                        name="logoUrl"
                    >
                        <MyVisibleUpload
                            initialImageUrl={updatedBrand?.logoUrl}
                            onChange={(file) => setImage(file)}
                        />
                    </Form.Item>
                    <Form.Item<Brand>
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

export default memo(UpdateBrand);