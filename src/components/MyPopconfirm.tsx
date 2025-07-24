import { Popconfirm } from "antd"
import '../styles/my_popconfirm.css'; // Adjust the path as necessary
interface MyPopConfirmProps {
    description?: string
    okText?: string
    cancelText?: string
    children: React.ReactNode,
    title: string,
    onConfirm: any
}
const MyPopConfirm = ({ cancelText, description, okText, children, title, onConfirm }: MyPopConfirmProps) => {
    return (
        <Popconfirm
            onConfirm={onConfirm}
            cancelText={cancelText}
            description={description}
            okText={okText}
            title={title}
            classNames={{
                root: 'no-shadow-popconfirm drop-shadow',
            }}
        >
            {children}
        </Popconfirm>
    )
}
export default MyPopConfirm