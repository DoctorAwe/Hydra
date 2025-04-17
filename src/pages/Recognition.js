import React, {useCallback, useEffect, useState} from 'react';
import {message, requests} from "../utils";
import {useDropzone} from "react-dropzone";
import {
    Box,
    Container,
    Divider,
    Grid,
    IconButton,
} from "@mui/material";
import {ImageSlider, ImageUploadAndAnnotate} from "../components";
import LoadingButton from "@mui/lab/LoadingButton";
import {Send} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import {setFiles, setSelectedImage, addFile, updateFile, setLoaded} from "../store/modules/files";
import {useDispatch, useSelector} from "react-redux";

const Recognition = () => {
    const dispatch = useDispatch();
    const { files, selectedImage } = useSelector((state) => state.file);
    const [loading, setLoading] = useState(false);
    const [disable, setDisable] = useState(true);
    const [loadingText, setLoadingText] = useState("预测");
    const [batchLoading, setBatchLoading] = useState(false);

    const onDrop = useCallback(async (acceptedFiles) => {
        for (const file of acceptedFiles) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                dispatch(setLoaded(false));
                const response = await requests.post('/files/upload', formData);

                const newFile = {
                    ...file,
                    preview: URL.createObjectURL(file),
                    shortLink: response,
                    isCompleted: false,
                    data: [],
                };

                dispatch(addFile(newFile));
                dispatch(setSelectedImage(newFile));

            } catch (error) {
                console.error(error);
                message.error({ content: '上传失败，请检查图片是否过大' });
            }
        }
    }, [dispatch]);

    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop,
        noClick: true,
        noKeyboard: true
    });

    const handlePredictClick = async (image) => {
        setLoading(true);
        const eventSource = new EventSource('http://localhost:8080/task/subscribe');

        eventSource.addEventListener('taskId', async (event) => {
            if (image.shortLink) {
                await requests.post('/task/send', { 'image_url': image.shortLink, "task_id": event.data });
                setLoadingText("任务启动中");
            }
        });

        eventSource.addEventListener('taskStart', () => {
            setLoadingText("识别中");
        });

        eventSource.addEventListener('complete', async (event) => {
            const data = JSON.parse(event.data);
            const updatedImage = { ...image, data: data, isCompleted: true };
            dispatch(setSelectedImage(updatedImage));
            dispatch(updateFile(updatedImage));
            setLoading(false);
            setLoadingText("预测");
            message.success({ content: `识别成功, ${data.length}个目标被检出`, duration: 2000 });
            eventSource.close();
        });
    };

    const handleBatchPredictClick = async () => {
        setBatchLoading(true);

        for (const file of files) {
            if (!file.isCompleted) {
                await handlePredictClick(file);
            }
        }

        setBatchLoading(false);
        message.success({ content: "批量预测完成", duration: 2000 });
    };

    const handleImageClick = (image) => {
        dispatch(setSelectedImage(image));
    };

    const handleDelete = (image, index) => {
        setFiles((prevFiles) => prevFiles.filter((file, i) => i !== index));
        if (selectedImage === image) {
            setSelectedImage(null);
        }
    };

    useEffect(() => {
        if (!selectedImage || selectedImage.isCompleted) {
            setDisable(true);
        } else {
            setDisable(false);
        }
    }, [selectedImage]);

    return (
        <Container maxWidth={false} style={{ height: '100vh', overflow: 'hidden', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box
                sx={{
                    width: '60%',
                    height: '55%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '1px solid gray',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <ImageUploadAndAnnotate
                    getRootProps={getRootProps}
                    getInputProps={getInputProps}
                    open={open}
                    image={selectedImage}
                />
            </Box>

            <Box style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                <Box style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <LoadingButton
                        variant="contained"
                        color="secondary"
                        onClick={() => handlePredictClick(selectedImage)}
                        loading={loading}
                        disabled={disable}
                        endIcon={<Send />}
                        sx={{ minWidth: '120px' }}
                    >
                        {loadingText}
                    </LoadingButton>

                    <LoadingButton
                        variant="contained"
                        color="secondary"
                        onClick={handleBatchPredictClick}
                        loading={batchLoading}
                        disabled={files.every((file) => file.isCompleted)}
                    >
                        批量预测
                    </LoadingButton>
                </Box>
            </Box>

            <Grid container spacing={1} sx={{ marginTop: '20px', width: '100%', borderTop: '1px solid gray', paddingTop: '10px' }}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px dashed gray',
                            borderRadius: '4px',
                            backgroundColor: "#ffffff",
                            opacity: "80%",
                            width: '100px',
                            height: '100px',
                            cursor: 'pointer',
                        }}
                        onClick={open}
                    >
                        <IconButton color="primary" component="span">
                            <AddIcon />
                        </IconButton>
                    </Box>

                    <Box sx={{ flexGrow: 1, overflowX: 'auto', whiteSpace: 'nowrap' }}>
                        <ImageSlider images={files} onImageClick={handleImageClick} />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Recognition;
