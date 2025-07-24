import { AlignLeft, Bell, ChevronDown, User } from "lucide-react"
import MyClickable from "../../components/MyClickable"
import { Avatar, Button, Divider } from "antd"
import MyPopover from "../../components/MyPopover"
import { memo } from "react"
import { useAuth } from "../../context/AuthProvider"
import { MdOutlineAccountCircle } from "react-icons/md"
import { IoIosLogOut, IoMdNotificationsOutline } from "react-icons/io"
import { CiLight } from "react-icons/ci"
import { useNavigate } from "react-router"

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const handleLogout = () => {
        logout()
        navigate('/login')
    }
    const Content = () => {
        return (
            <div className="flex flex-col items-start min-w-[150px] max-w-[220px] ">
                <div className="flex gap-2">
                    <Avatar size={36} src='https://i.pinimg.com/736x/7f/2f/ef/7f2feff875ce69bc60222278fa73c41c.jpg' icon={<User strokeWidth={1} />} />
                    <div className=' drop-shadow'>
                        <p >{user?.name}</p>
                        <p className='font-medium'>{user?.role}</p>
                    </div>
                </div>
                <Divider className="my-[5px]" />
                <Button className="w-full flex justify-start  py-[10px] px-[0px]" type="text"> <MdOutlineAccountCircle size={16} /> Profile </Button>
                <Button className="w-full flex justify-start  py-[10px]  px-[0px]" type="text"> <IoMdNotificationsOutline size={16} /> Notification </Button>
                <Button className="w-full flex justify-start  py-[10px]  px-[0px]" type="text"> <CiLight size={16} /> Light Mode </Button>
                <Divider className="my-[5px]" />
                <Button className="w-full flex justify-start py-[10px]  px-[0px] text-red-500" type="text" onClick={handleLogout}> <IoIosLogOut size={16} /> Logout </Button>
            </div>
        )
    }
    return (
        <header className="bg-white  p-3 flex items-center justify-between">
            <MyClickable> <AlignLeft strokeWidth={1} onClick={toggleSidebar} /></MyClickable>
            <div className='flex items-center gap-6 ml-auto mr-[30px]'>
                <MyClickable ><Bell size={18} strokeWidth={1} /></MyClickable>
                <div className='flex gap-3 items-center ' >
                    <Avatar size={36} src='https://i.pinimg.com/736x/7f/2f/ef/7f2feff875ce69bc60222278fa73c41c.jpg' icon={<User strokeWidth={1} />} />
                    <div className=' drop-shadow'>
                        <p >{user?.name}</p>
                        <p className='font-medium'>{user?.role}</p>
                    </div>
                    <MyPopover
                        content={<Content />}
                        trigger="click"
                    >
                        <MyClickable><ChevronDown size={20} strokeWidth={1} /></MyClickable>
                    </MyPopover>
                </div>
            </div>
        </header>
    )

}
export default memo(Header);