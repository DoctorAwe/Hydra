import React, { useEffect, useRef } from 'react';
import { SliderContainer, Slide, Image, Overlay, Checkmark, DeleteIcon } from './styles';

const ImageSlider = ({ images, onImageClick, }) => {
    const sliderRef = useRef(null);

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        }
    }, [images]);

    const handleClick = (image, index) => {
        if (onImageClick) {
            onImageClick(image, index);
        }
    };


    return (
        <SliderContainer ref={sliderRef}>
            {images.map((image, index) => (
                <Slide key={index} onClick={() => handleClick(image, index)}>
                    <Image src={image.preview} alt={`Slide ${index}`} />
                    <Overlay isCompleted={image.isCompleted}>
                        <Checkmark>✓</Checkmark>
                    </Overlay>
                </Slide>
            ))}
        </SliderContainer>
    );
};

export default ImageSlider;
