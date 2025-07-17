import Lottie from "lottie-react"
import animation404 from "../assets/404.json";
const NotFoundPage = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-[500px] h-[500px]">
                <Lottie animationData={animation404} loop />
            </div>
        </div>

    )
}
export default NotFoundPage