import React from 'react';
import { Image, Carousel } from 'antd';


interface ImageItem {
    url: string;
    alt?: string;
}

interface ImageSliderProps {
    images: ImageItem[] | undefined;
    carouselRef?: React.RefObject<any>;
}

const MyImageDisplay: React.FC<ImageSliderProps> = ({ images, carouselRef }) => {
    return (
        <Carousel
            ref={carouselRef}
            lazyLoad='progressive' arrows autoplay dots effect="fade" style={{ width: '100%', maxWidth: '600px', margin: "auto", aspectRatio: "5/3" }}>
            {images?.map((image, index) => (
                <div key={index}>
                    <Image
                        src={image.url}
                        alt={image.alt || `Slide ${index + 1}`}
                        style={{ width: '100%', height: 'auto', objectFit: 'contain', aspectRatio: "5/3" }}
                        preview
                    />
                </div>
            ))}
        </Carousel>
    );
};

export default MyImageDisplay;