import { Spin, type SpinProps } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
interface MyLoadingProps {
    spinStyle?: SpinProps;
    size?: number
}
const MyLoading: React.FC<MyLoadingProps> = ({ spinStyle, size = 48 }) => {
    return (
        <div className="flex justify-center items-center w-full h-full">
            <Spin  {...spinStyle} indicator={<LoadingOutlined spin style={{ fontSize: size }} />} />
        </div>
    );
};
export default MyLoading;