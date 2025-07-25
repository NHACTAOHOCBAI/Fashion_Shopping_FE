import { Avatar, Divider, Pagination, Rate } from "antd"
import { useState } from "react"

const Reviews = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(5)
    const [total, setTotal] = useState<number>(50)
    return (
        <div className="bg-white p-[14px] rounded-lg border mt-[10px]">
            <h2 className='font-medium text-[14px] mb-[10px] '>Reviews</h2>
            <div className="flex gap-[20px] items-center">
                <h3 className="text-[46px] font-bold text-text-heading">4.8</h3>
                <div>
                    <Rate disabled allowHalf value={4.8} />
                    <p>Based on 140 Reviews</p>
                </div>
            </div>

            <div className="flex flex-col gap-[20px]">
                <ReviewItem />
                <ReviewItem />
                <div className="flex justify-end">
                    <Pagination className="mt-[10px]"
                        onChange={(value) => setCurrentPage(value)}
                        pageSize={pageSize} total={total} />
                </div>
            </div>
        </div>
    )
}
const ReviewItem = () => {
    return (
        <div>
            <div className="flex gap-[20px]">
                <Avatar size={36}>USER</Avatar>
                <div >
                    <div>ptminhhoang0612</div>
                    <div className="flex gap-1 items-center ">
                        <div>
                            <Rate className="text-[12px]" disabled value={4} />
                        </div>
                        <Divider type="vertical" />
                        <p className="mb-1">Jul 08, 2025, 15:30</p>
                    </div>
                </div>
            </div>
            <div className="ml-[56px] mt-[10px]">
                <p>Size : Default</p>
                <p>Color : Default</p>
                <p>Introducing the Nike Alpha All-Purpose Gen Z, the latest evolution in athletic footwear designed to meet the dynamic needs of the modern generation. These cutting-edge trainers represent a fusion of style, technology, and performance, making them a perfect choice for those who value both form and function. The Gen Z boasts a sleek, contemporary design .</p>
            </div>
        </div>
    )
}
export default Reviews