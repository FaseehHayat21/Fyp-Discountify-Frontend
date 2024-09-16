import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the carousel styles

const CarouselComponent = ({ images }) => {
    return (
        <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true} emulateTouch={true}>
            {images.map((image, index) => (
                <div key={index}>
                    <img src={image} alt={`Slide ${index + 1}`} />
                </div>
            ))}
        </Carousel>
    );
};

export default CarouselComponent;
