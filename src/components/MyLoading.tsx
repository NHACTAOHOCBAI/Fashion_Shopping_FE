import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
const MyLoading = () => {
    return (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} className="text-accent-pinkRed block" spin />} />
    );
}
export default MyLoading;