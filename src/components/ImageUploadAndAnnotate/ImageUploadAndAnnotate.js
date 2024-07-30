import React, { useEffect, useRef } from 'react';
import {Typography } from '@mui/material';
import { ContainerBox, ImageBox, ImageStyle, CanvasStyle, UploadBox, Icon, HiddenInput } from './styles';

const ImageUploadAndAnnotate = ({ getRootProps, getInputProps, open, image }) => {
    const canvasRef = useRef(null);
    const imgRef = useRef(null);

    useEffect(() => {
        if (image) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const img = imgRef.current;

            // Ensure canvas size is equal to the image's container size
            const containerWidth = canvas.parentElement.clientWidth;
            const containerHeight = canvas.parentElement.clientHeight;

            // Calculate the aspect ratio to maintain the image's aspect ratio
            const imgRatio = img.naturalWidth / img.naturalHeight;
            const containerRatio = containerWidth / containerHeight;

            let drawWidth, drawHeight;
            if (imgRatio > containerRatio) {
                drawWidth = containerWidth;
                drawHeight = containerWidth / imgRatio;
            } else {
                drawHeight = containerHeight;
                drawWidth = containerHeight * imgRatio;
            }

            // Center the image in the canvas
            const offsetX = (containerWidth - drawWidth) / 2;
            const offsetY = (containerHeight - drawHeight) / 2;

            // Set canvas dimensions
            canvas.width = containerWidth;
            canvas.height = containerHeight;

            // Clear previous drawings
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw the image centered on the canvas
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

            // Draw annotations
            image.data.forEach(([cls, x1, y1, x2, y2, confidence]) => {
                const x1Canvas = offsetX + x1 * drawWidth;
                const y1Canvas = offsetY + y1 * drawHeight;
                const x2Canvas = offsetX + x2 * drawWidth;
                const y2Canvas = offsetY + y2 * drawHeight;

                ctx.strokeStyle = 'aqua';
                ctx.lineWidth = 1;
                ctx.strokeRect(x1Canvas, y1Canvas, x2Canvas - x1Canvas, y2Canvas - y1Canvas);

                ctx.font = '10px Arial';
                ctx.fillStyle = 'aqua';
                ctx.fillText(`Class: ${cls}, Conf: ${confidence}`, x1Canvas, y1Canvas - 5);
            });
        }
    }, [image]);

    return (
        <ContainerBox {...getRootProps()}>
            {image ? (
                <ImageBox>
                    <ImageStyle ref={imgRef} src={image.preview} alt="Selected" />
                    <CanvasStyle ref={canvasRef} />
                </ImageBox>
            ) : (
                <UploadBox onClick={open}>
                    <input {...getInputProps()} css={HiddenInput} />
                    <Icon />
                    <Typography variant="body1" color="textSecondary">
                        将图像拖放到此处
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                        <span style={{ fontWeight: 'bold' }}>- 或 -</span>
                    </Typography>
                    <Typography variant="body1" color="primary" sx={{ mt: 2 }}>
                        点击上传
                    </Typography>
                </UploadBox>
            )}
        </ContainerBox>
    );
};

export default ImageUploadAndAnnotate;
