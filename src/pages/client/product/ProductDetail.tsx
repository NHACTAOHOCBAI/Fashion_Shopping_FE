
import { Breadcrumb, Button, Divider, message, Radio, type RadioChangeEvent } from "antd";
import MyImageDisplay from "../../../components/MyImageDisplay";
import { FaStar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import Reviews from "../../admin/product/ui/Reviews";
import { useParams } from "react-router";
import { useGetProdutcById } from "../../../hooks/useProduct";
import { useMemo } from "react";
import { formatPrice } from "../../../utils/formatPrice";
import useDetailProduct from "./hooks/useImagesPreview";
import { useNotify } from "../../../components/MyNotification";
const ProductDetail = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const notify = useNotify();
    const { id } = useParams();
    const { data: detailProduct, isPending } = useGetProdutcById(Number(id))
    // 
    const { carouselRef, selectedColor, selectedSize, setSelectedColor, setSelectedSize, thumbnails, matchedPrice, quantity, stock } = useDetailProduct(detailProduct)
    const handleAddToCart = () => {
        if (!selectedColor || !selectedSize) {
            notify({
                message: "Missing Options",
                description: "Please select both size and color before adding to cart.",
            });
            return;
        }
        messageApi.success(`Add ${detailProduct?.name} to your cart successfully`)
    }
    return (
        <>
            {contextHolder}
            <div className="mx-[80px] mb-[20px]">
                <Breadcrumb
                    className="py-[20px]"
                    items={[
                        {
                            title: "Products",
                            href: "/products"
                        },
                        {
                            title: id,
                            href: `/product-detail/${id}`,
                        },
                    ]}
                />
                <div className="flex gap-[40px]">
                    <div className="flex-[1] border rounded-lg h-fit ">
                        <MyImageDisplay carouselRef={carouselRef} images={thumbnails} />
                    </div>
                    <div className="flex-[1] relative min-h-[500px] flex flex-col justify-between">
                        <div>
                            <CiHeart size={24} className="absolute text-gray-300 z-10 top-[0x] right-[0px]" />
                            <h3 className="font-medium text-[14px] text-gray-500">{detailProduct?.brand.name}</h3>
                            <h2 className="text-[40px] font-semibold text-text-heading">{detailProduct?.name}</h2>
                            <p className=" my-[10px] w-[80%]">{detailProduct?.description}</p>

                        </div>
                        <div >
                            <div className="flex items-center gap-[10px] my-[10px]">
                                <div><span className="font-semibold text-text-heading text-[14px]">{quantity - stock}+</span> sold</div>
                                <Divider type="vertical" />
                                <div className="flex items-center gap-[5px]">
                                    <FaStar className="text-yellow-300" />
                                    <div>
                                        <span className="font-semibold text-text-heading text-[14px]">4.8</span><span>(156 reviews)</span>
                                    </div>
                                </div>
                            </div>
                            <h3 className="font-semibold text-text-heading text-[20px] mb-[40px]">{formatPrice(matchedPrice)}</h3>
                            <Options
                                variants={detailProduct?.variants}
                                selectedColor={selectedColor}
                                setSelectedColor={setSelectedColor}
                                selectedSize={selectedSize}
                                setSelectedSize={setSelectedSize}
                            />
                            <Button onClick={handleAddToCart} type="primary" className="w-[80%] mb-[20px]  bg-yellow-300 py-[24px]  font-bold text-[20px] rounded-2xl">Add to Cart</Button>
                        </div>
                    </div>
                </div>
                <Reviews />
            </div>
        </>
    )
}
interface OptionsProps {
    variants: Variant[] | undefined;
    selectedColor: string | undefined;
    setSelectedColor: (value: string | undefined) => void;
    selectedSize: string | undefined;
    setSelectedSize: (value: string | undefined) => void;
}

const Options = ({
    variants,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
}: OptionsProps) => {
    const onColorChange = (e: RadioChangeEvent) => {
        setSelectedColor(e.target.value);
        setSelectedSize(undefined)
    };
    const onSizeChange = (e: RadioChangeEvent) => {
        setSelectedSize(e.target.value);
    };

    // Lấy màu duy nhất
    const colorOptions = useMemo(() => {
        const set = new Set<string>();
        variants?.forEach((v) => set.add(v.color));
        return Array.from(set);
    }, [variants]);

    // Lấy size duy nhất
    const sizeOptions = useMemo(() => {
        const set = new Set<string>();
        variants?.forEach((v) => set.add(v.size));
        return Array.from(set);
    }, [variants]);

    const isValidColor = (color: string) => {
        if (selectedSize === undefined)
            return true
        const result = variants?.find((value) => value.color === color && value.size === selectedSize)
        if (result === undefined)
            return false;
        return true;
    }
    const isValidSize = (size: string) => {
        if (selectedColor === undefined)
            return true
        const result = variants?.find((value) => value.size === size && value.color === selectedColor)
        if (result === undefined)
            return false;
        return true;
    }
    return (
        <div className="flex flex-col gap-[20px] mb-[20px]">
            <div>
                <div className="mb-[8px]">
                    <span className="font-semibold text-text-heading text-[14px]">Color :</span>{' '}
                    <span>{selectedColor || 'None'}</span>
                </div>
                <Radio.Group onChange={onColorChange} value={selectedColor}>
                    <div className="flex gap-[10px] flex-wrap">
                        {colorOptions.map((value) => (
                            <Radio.Button key={value} value={value}>
                                {value}
                            </Radio.Button>
                        ))}
                    </div>
                </Radio.Group>
            </div>
            <div>
                <div className="mb-[8px]">
                    <span className="font-semibold text-text-heading text-[14px]">Size :</span>{' '}
                    <span>{selectedSize || 'None'}</span>
                </div>
                <Radio.Group onChange={onSizeChange} value={selectedSize}>
                    <div className="flex gap-[10px] flex-wrap">
                        {sizeOptions.map((value) => (
                            <Radio.Button disabled={!isValidSize(value)} key={value} value={value}>
                                {value}
                            </Radio.Button>
                        ))}
                    </div>
                </Radio.Group>
            </div>
        </div>
    );
};

export default ProductDetail