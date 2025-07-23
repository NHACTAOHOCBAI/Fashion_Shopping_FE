import MyVisibleUpload from "../../../components/MyVisibileUpload";

const Dashboard = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p>Welcome to the admin dashboard!</p>
            <MyVisibleUpload />
        </div>
    );
}
export default Dashboard;