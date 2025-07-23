import React, { useState, useEffect } from 'react';
import { Upload, message, Image } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { PlusOutlined } from '@ant-design/icons';

type Props = {
    onChange?: (file?: File) => void;
    initialImageUrl?: string;
    maxCount?: number
};

const MyVisibleUpload: React.FC<Props> = ({ onChange, initialImageUrl, maxCount = 1 }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {
        if (initialImageUrl) {
            setFileList([
                {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: initialImageUrl,
                },
            ]);
        } else {
            setFileList([]);
        }
    }, [initialImageUrl]);

    const handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
        const latestFile = fileList[0];

        if (onChange) {
            const file = latestFile?.originFileObj;
            onChange(file);
        }

        setFileList(fileList); // Chỉ giữ lại 1 file
    };

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview && file.originFileObj) {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => {
                setPreviewImage(reader.result as string);
                setPreviewOpen(true);
            };
        } else {
            setPreviewImage(file.url || (file.preview as string));
            setPreviewOpen(true);
        }
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <>
            <Upload
                accept="image/*"
                listType="picture-card"
                fileList={fileList}
                beforeUpload={() => false}
                onChange={handleChange}
                onPreview={handlePreview}
                maxCount={maxCount}
            >
                {uploadButton}
            </Upload>

            {/* Preview full-screen */}
            {previewImage && (
                <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
        </>
    );
};

export default MyVisibleUpload;
