import { Outlet } from "react-router"

const AdminLayout = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome to the admin dashboard.</p>
            <Outlet />
        </div>
    );
}
export default AdminLayout;