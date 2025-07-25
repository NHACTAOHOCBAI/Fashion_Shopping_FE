import React from 'react';
import { Image, Carousel } from 'antd';


interface ImageItem {
    url: string;
    alt?: string;
}

interface ImageSliderProps {
    images: ImageItem[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    return (
        <Carousel arrows autoplay dots effect="fade" style={{ width: '100%', maxWidth: '600px', margin: "auto", aspectRatio: "5/3" }}>
            {images.map((image, index) => (
                <div key={index}>
                    <Image
                        src={image.url}
                        alt={image.alt || `Slide ${index + 1}`}
                        style={{ width: '100%', height: 'auto', objectFit: 'cover', aspectRatio: "5/3" }}
                        preview
                    />
                </div>
            ))}
        </Carousel>
    );
};

export default ImageSlider;