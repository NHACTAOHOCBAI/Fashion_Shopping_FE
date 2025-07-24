import { useState } from "react";
import MyUploadFile from "../../../components/MyUploadFile";
import type { UploadFile } from "antd";

const Dashboard = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p>Welcome to the admin dashboard!</p>
            <MyUploadFile
                width={"50%"}
                quantity={1}
                setFileList={setFileList}
                fileList={fileList} />
        </div>
    );
}
export default Dashboard;