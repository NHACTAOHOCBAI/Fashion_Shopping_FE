import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import type { UploadProps, UploadFile } from 'antd';
const { Dragger } = Upload;

type MyUploadFileProps = {
    onFileListChange?: (files: UploadFile[]) => void;
    disabled?: boolean
};

const MyUploadFile = ({ onFileListChange, disabled }: MyUploadFileProps) => {
    const props: UploadProps = {
        name: 'image',
        multiple: true,
        accept: 'image/*',
        beforeUpload: () => false,
        onChange(info) {
            onFileListChange?.(info.fileList);
        },
    };

    return (
        <Dragger disabled={disabled} {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag image files to this area</p>
            <p className="ant-upload-hint">
                Only image files (JPG, PNG, GIF...) are allowed. They will not be uploaded automatically.
            </p>
        </Dragger>
    );
};

export default MyUploadFile;
