import { useEffect, useMemo, useRef, useState } from "react";

const useDetailProduct = (detailProduct: Product | undefined) => {
    const [selectedColor, setSelectedColor] = useState<string>();
    const [selectedSize, setSelectedSize] = useState<string>();
    const carouselRef = useRef<any>(null);
    // 
    const thumbnails = useMemo(() => {
        const allImages = [
            ...(detailProduct?.images.map((img, index) => ({
                alt: `Product ${index}`,
                url: img.imageUrl,
            })) || []),
            ...(detailProduct?.variants.map((v) => ({
                alt: `Variant ${v.color}-${v.size}`,
                url: v.imageUrl,
            })) || []),
        ];
        return allImages;
    }, [detailProduct]);
    // tim anh 
    const matchedVariant = useMemo(() => {
        if (!selectedColor || !selectedSize || !detailProduct) return undefined;
        return detailProduct.variants.find(
            (v) => v.color === selectedColor && v.size === selectedSize
        );
    }, [selectedColor, selectedSize, detailProduct]);
    const matchedPrice = useMemo(() => {
        if (!matchedVariant) return detailProduct?.price;
        return matchedVariant.price;
    }, [matchedVariant, detailProduct]);
    const matchedIndex = useMemo(() => {
        if (!matchedVariant) return -1;
        return thumbnails.findIndex((img) => img.url === matchedVariant.imageUrl);
    }, [matchedVariant, thumbnails]);
    //gia
    const stock = detailProduct?.variants.reduce((total, value) => {
        return total + Number(value.remaining);
    }, 0) || 0;
    const quantity = detailProduct?.variants.reduce((total, value) => {
        return total + Number(value.quantity);
    }, 0) || 0;
    useEffect(() => {
        if (matchedIndex >= 0 && carouselRef.current) {
            carouselRef.current.goTo(matchedIndex);
        }
    }, [matchedIndex]);
    return {
        stock,
        quantity,
        matchedPrice,
        carouselRef,
        thumbnails,
        selectedColor,
        setSelectedColor,
        selectedSize,
        setSelectedSize,
    };
}
export default useDetailProduct