import { AlignLeft, Bell, ChevronDown, User } from "lucide-react"
import MyClickable from "../../components/MyClickable"
import { Avatar } from "antd"
import MyPopover from "../../components/MyPopover"
import { memo } from "react"

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
    console.log("header")
    return (
        <header className="bg-white  p-3 flex items-center justify-between">
            <MyClickable> <AlignLeft strokeWidth={1} onClick={toggleSidebar} /></MyClickable>
            <div className='flex items-center gap-6 ml-auto mr-[20px]'>
                <MyClickable ><Bell size={18} strokeWidth={1} /></MyClickable>
                <div className='flex gap-1 items-center' >
                    <Avatar icon={<User strokeWidth={1} />} />
                    <div className='text-[10px] drop-shadow'>
                        <p >@Toji_2k5</p>
                        <p className='font-medium'>Admin</p>
                    </div>
                    <MyPopover
                        content={<div>No shadow here</div>}
                        title="Title"
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