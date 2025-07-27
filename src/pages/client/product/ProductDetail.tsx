
import { Breadcrumb, Button, Divider, Radio, type RadioChangeEvent } from "antd";
import MyImageDisplay from "../../../components/MyImageDisplay";
import { FaStar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import Reviews from "../../admin/product/ui/Reviews";
const thumbnails = [
    {
        alt: `Thumbnail 1`,
        url: "https://i.pinimg.com/736x/0a/6c/8a/0a6c8af6388b24b008890992d6b5bb90.jpg"
    }
]
const ProductDetail = () => {
    return (
        <div className="mx-[80px] mb-[20px]">
            <Breadcrumb
                className="py-[20px]"
                items={[
                    {
                        title: "Products",
                    },
                    {
                        title: 'Jujutsu kaisen',
                        href: '',
                    },
                    {
                        title: 'Yuta',
                        href: '',
                    },
                ]}
            />
            <div className="flex gap-[40px]">
                <div className="flex-[1] border rounded-lg h-fit ">
                    <MyImageDisplay images={thumbnails} />
                </div>
                <div className="flex-[1] relative min-h-[500px] flex flex-col justify-between">
                    <div>
                        <CiHeart size={24} className="absolute text-gray-300 z-10 top-[0x] right-[0px]" />
                        <h3 className="font-medium text-[14px] text-gray-500">Nike</h3>
                        <h2 className="text-[40px] font-semibold text-text-heading">Alpha All-Purpose Gen Z</h2>
                        <p className=" my-[10px] w-[80%]">Introducing the Nike Alpha All-Purpose Gen Z, the latest evolution in athletic footwear designed to meet the dynamic needs of the modern generation. These cutting-edge trainers represent a fusion of style, technology, and performance, making them a perfect choice for those who value both form and function. The Gen Z boasts a sleek, contemporary design that </p>
                        <div className="flex items-center gap-[10px] my-[10px]">
                            <div><span className="font-semibold text-text-heading text-[14px]">100+</span> sold</div>
                            <Divider type="vertical" />
                            <div className="flex items-center gap-[5px]">
                                <FaStar className="text-yellow-300" />
                                <div>
                                    <span className="font-semibold text-text-heading text-[14px]">4.8</span><span>(156 reviews)</span>
                                </div>
                            </div>
                        </div>
                        <h3 className="font-semibold text-text-heading text-[20px] mb-[40px]">$ 90</h3>
                    </div>
                    <div >
                        <Options />
                        <Button type="primary" className="w-[80%] mb-[20px]  bg-yellow-300 py-[24px]  font-bold text-[20px] rounded-2xl">Add to Cart</Button>
                    </div>
                </div>
            </div>
            <Reviews />
        </div>
    )
}
const Options = () => {
    const onChange = (e: RadioChangeEvent) => {
        console.log(`radio checked:${e.target.value}`);
    };
    const colorOptions = [
        { value: 'white-orange', image: '/img/white-orange.png' },
        { value: 'black-red', image: '/img/black-red.png' },
        { value: 'gray', image: '/img/gray.png' },
    ];
    const sizeOptions = [
        { value: 'letter-XS', title: 'XS (Extra Small)' },
        { value: 'letter-S', title: 'S (Small)' },
        { value: 'letter-M', title: 'M (Medium)' },
        { value: 'letter-L', title: 'L (Large)' },
        { value: 'letter-XL', title: 'XL (Extra Large)' },
        { value: 'letter-XXL', title: 'XXL (2X Large)' },
        { value: 'letter-XXXL', title: 'XXXL (3X Large)' },
        { value: 'number-28', title: '28' },
        { value: 'number-30', title: '30' },
        { value: 'number-32', title: '32' },
        { value: 'number-34', title: '34' },
        { value: 'number-36', title: '36' },
        { value: 'number-38', title: '38' },
        { value: 'number-40', title: '40' },
    ];
    return (
        <div className="flex flex-col gap-[20px] mb-[20px]">
            <div>
                <div className="mb-[8px]"><span className="font-semibold text-text-heading text-[14px]">Color :</span> <span> White-Orange</span></div>
                <Radio.Group onChange={onChange} defaultValue="a">
                    <div className="flex gap-[10px]">
                        {colorOptions.map((value) => {
                            return (
                                <Radio.Button className="" value={value.value}>{value.value}</Radio.Button>
                            )
                        })}
                    </div>
                </Radio.Group>
            </div>
            <div>
                <div className="mb-[8px]"><span className="font-semibold text-text-heading text-[14px]">Color :</span> <span> White-Orange</span></div>
                <Radio.Group onChange={onChange} defaultValue="a">
                    <div className="flex gap-[10px] flex-wrap">
                        {sizeOptions.map((value) => {
                            return (
                                <Radio.Button className="" value={value.value}>{value.value}</Radio.Button>
                            )
                        })}
                    </div>
                </Radio.Group>
            </div>
        </div>
    )
}
export default ProductDetail