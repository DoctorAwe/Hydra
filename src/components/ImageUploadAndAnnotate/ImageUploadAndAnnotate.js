import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Typography } from '@mui/material';
import { ContainerBox, ImageBox, ImageStyle, CanvasStyle, UploadBox, Icon, HiddenInput } from './styles';
import {useDispatch, useSelector} from "react-redux";
import {setLoaded} from "../../store/modules/files";

const ImageUploadAndAnnotate = ({ getRootProps, getInputProps, open, image }) => {
    const canvasRef = useRef(null);
    const imgRef = useRef(null);
    const dispatch = useDispatch();
    const { loaded } = useSelector((state) => state.file);


    useLayoutEffect(() => {
        if (image) {
            console.log(image)
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const img = imgRef.current;

            if (!img) return;

            // 等待图片加载完成再处理绘制
            img.onload = () => {

                const containerWidth = canvas.parentElement.clientWidth;
                const containerHeight = canvas.parentElement.clientHeight;
                console.log(containerWidth,containerHeight)
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

                const offsetX = (containerWidth - drawWidth) / 2;
                const offsetY = (containerHeight - drawHeight) / 2;

                canvas.width = containerWidth;
                canvas.height = containerHeight;

                // 清空 Canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // 绘制图片
                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

                // 绘制标注
                if (image.data) {
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
            };
            if (img.complete) {
                img.onload(); // 手动调用
            }

        }
    }, [image]);


    return (
        <ContainerBox {...getRootProps()} style={{width:"100%" }}>
            {image ? (
                <ImageBox style={{width:"100%"}}>
                    <ImageStyle
                        ref={imgRef}
                        src={image.preview}
                        alt="Selected"
                    />

                    <CanvasStyle ref={canvasRef} />
                </ImageBox>
            ) : (
                <UploadBox
                    onClick={open}
                    style={{
                        width: '300px', // 设置固定宽度
                        height: '200px', // 设置固定高度
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        backgroundColor: '#f9f9f9', // 浅灰背景色
                        boxSizing: 'border-box',
                    }}
                >
                    <input {...getInputProps()} style={{ display: 'none' }} /> {/* 隐藏 input */}
                    <Icon style={{ fontSize: '48px', color: '#888' }} /> {/* 图标样式 */}
                    <Typography variant="body1" color="textSecondary">
                        将图像拖放到此处
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ marginTop: '8px' }}>
                        <span style={{ fontWeight: 'bold' }}>- 或 -</span>
                    </Typography>
                    <Typography variant="body1" color="primary" style={{ marginTop: '16px' }}>
                        点击上传
                    </Typography>
                </UploadBox>

            )}
        </ContainerBox>
    );
};

export default ImageUploadAndAnnotate;
