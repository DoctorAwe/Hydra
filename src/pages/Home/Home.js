import React, {useCallback, useEffect, useState} from 'react';
import { Box, Container, Divider, Grid, IconButton } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import AddIcon from '@mui/icons-material/Add';
import { message, requests } from "../../utils";
import LoadingButton from "@mui/lab/LoadingButton";
import { ImageSlider, ImageUploadAndAnnotate } from "../../components";
import {Send} from "@mui/icons-material";
import {BarChart, LineChart} from '@mui/x-charts';


const App = () => {
    const [files, setFiles] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [disable, setDisable] = useState(true);
    const [loadingText, setLoadingText] = useState("推理")
    const [barChartData, setBarChartData] = useState({ current: {}, overall: {} });
    const [lineChartData, setLineChartData] = useState({ densities: [], averageSizes: [] });

    const calculateChartData = useCallback(() => {
        const completedFiles = files.filter(file => file.isCompleted);

        const overallDensity = completedFiles.length ? completedFiles.length / completedFiles.reduce((acc, file) => acc + file.data.length, 0) : 0;
        const overallAverageSize = completedFiles.length
            ? completedFiles.reduce((acc, file) => {
            const sizes = file.data.map(d => (d[3] - d[1]) * (d[4] - d[2]) * 100);
            return acc + sizes.reduce((a, b) => a + b, 0) / sizes.length;
        }, 0) / completedFiles.length
            : 0;

        const currentDensity = selectedImage && selectedImage.isCompleted ? 1 / selectedImage.data.length : 0;
        const currentAverageSize = selectedImage && selectedImage.isCompleted
            ? selectedImage.data.map(d => (d[3] - d[1]) * (d[4] - d[2]) *100).reduce((a, b) => a + b, 0) / selectedImage.data.length
            : 0;

        setBarChartData({
            current: { density: currentDensity, averageSize: currentAverageSize },
            overall: { density: overallDensity, averageSize: overallAverageSize },
        });

        const densities = completedFiles.map(file => 1 / file.data.length);
        const averageSizes = completedFiles.map(file => {
            const sizes = file.data.map(d => (d[3] - d[1]) * (d[4] - d[2]) *100);
            return sizes.reduce((a, b) => a + b, 0) / sizes.length;
        });
        setLineChartData({
                densities,
                averageSizes,
        });


    }, [files, selectedImage]);


    useEffect(() => {
        calculateChartData();
    }, [files, selectedImage]);

    const onDrop = useCallback(async (acceptedFiles) => {
        for (const file of acceptedFiles) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await requests.post('/files/upload', formData);

                const newFile = {
                    ...file,
                    preview: URL.createObjectURL(file),
                    shortLink: response,
                    isCompleted: false,
                    data: [],
                };

                // 更新状态，先更新文件列表再设置选中的图片
                setFiles((prevFiles) => [...prevFiles, newFile]);
                setSelectedImage(newFile);

            } catch (error) {
                console.error(error);
                message.error({ content: '上传失败，请检查图片是否过大' });
            }
        }
    }, []);

    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop,
        noClick: true,
        noKeyboard: true
    });

    const handlePredictClick = async () => {
        setLoading(true);
        const eventSource = new EventSource('http://localhost:8080/task/subscribe');

        eventSource.addEventListener('taskId', async (event) => {
            if (selectedImage.shortLink) {
                await requests.post('/task/send', { 'image_url': selectedImage.shortLink, "task_id": event.data });
                setLoadingText("任务启动中")
            }
        });

        eventSource.addEventListener('taskStart', async (event) => {
            setLoadingText("识别中")
        });



        eventSource.addEventListener('complete', async (event) => {
            const data = JSON.parse(event.data);
            const updatedImage = { ...selectedImage, data:data, isCompleted: true };
            setSelectedImage(updatedImage);
            setFiles((prevFiles) =>
                prevFiles.map((file) => (file.shortLink === updatedImage.shortLink ? updatedImage : file))
            );
            setLoading(false);
            eventSource.close();
            setLoadingText("推理")
            message.success({content:` 识别成功, ${data.length}个目标被检出`, duration: 2000})
        });
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleDelete = (image, index) => {
        setFiles((prevFiles) => prevFiles.filter((file, i) => i !== index));
        if (selectedImage === image) {
            setSelectedImage(null);
        }
    };

    useEffect(() => {
        if (selectedImage == null || selectedImage.isCompleted) {
            setDisable(true);
        } else {
            setDisable(false);
        }
    }, [selectedImage]);



    return (
        <Container maxWidth={false} style={{ height: '100vh', overflow: 'hidden', padding: '20px' }}>
            <Grid container spacing={2} sx={{ height: "100%" }}>
                <Grid item xs={6} sx={{ height: "55%" }}>
                    <ImageUploadAndAnnotate
                        getRootProps={getRootProps}
                        getInputProps={getInputProps}
                        open={open}
                        image={selectedImage}
                    />

                    <Divider style={{ marginBottom: '20px' }} />
                    <Box style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Box style={{ width:"60%", display: 'flex', justifyContent: 'space-between', alignItems: 'center',}}>
                        <LoadingButton
                            variant="contained"
                            color="secondary"
                            onClick={handlePredictClick}
                            loading={loading}
                            disabled={disable}
                            endIcon={<Send />}
                            loadingPosition="end"
                            sx={{
                                marginBottom: '20px',
                                height: '40px', // 固定高度
                                minWidth: '100px', // 最小宽度
                                width: 'auto', // 自适应宽度
                                paddingLeft: '16px',
                                paddingRight: '16px',
                            }}
                        >
                            <span>{loadingText}</span>
                        </LoadingButton>
                        <LoadingButton  variant="contained"
                                        color="secondary"
                                        disabled={true}
                                        sx={{
                                            marginBottom: '20px',
                                            height: '40px', // 固定高度
                                            minWidth: '100px', // 最小宽度
                                            width: 'auto', // 自适应宽度
                                            paddingLeft: '16px',
                                            paddingRight: '16px',
                                        }}>
                            <span> 全部推理 </span>

                        </LoadingButton>
                        <LoadingButton  variant="contained"
                                        color="secondary"
                                        disabled={true}
                                        sx={{
                                            marginBottom: '20px',
                                            height: '40px', // 固定高度
                                            minWidth: '100px', // 最小宽度
                                            width: 'auto', // 自适应宽度
                                            paddingLeft: '16px',
                                            paddingRight: '16px',
                                        }}>
                            <span> 导出数据 </span>
                        </LoadingButton>

                    </Box>
                    </Box>

                    <Grid container sx={{
                        padding: '20px 0',
                        border: '1px solid gray',
                        borderRadius: '4px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}>
                        <Grid item xs={3} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                        }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '1px dashed gray',
                                    borderRadius: '4px',
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
                        </Grid>
                        <Grid item xs={9} sx={{
                            display: 'flex',
                            overflowX: 'auto',
                            whiteSpace: 'nowrap'
                        }}>
                            <Box>
                                <ImageSlider images={files} onImageClick={handleImageClick} />
                            </Box>
                        </Grid>
                    </Grid>


                </Grid>
                <Grid item xs={6} >
                    <Box sx={{ height: '300px', width: '100%' }}>
                        <BarChart
                            xAxis={[{ scaleType: 'band', data: ['种群密度 (相对)', '平均尺寸 (相对)'] }]}
                            series={[
                                { data: [barChartData.current.density, barChartData.current.averageSize], label: "当前" },
                                { data: [barChartData.overall.density, barChartData.overall.averageSize], label: "总体" },
                            ]}
                            height={300}
                        />

                    </Box>
                    <Divider style={{ marginBottom: '20px' }} />
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <LineChart
                            xAxis={[{ data: files.filter(file => file.isCompleted).map((_, idx) => idx + 1) }]}
                            series={[
                                {
                                    data: lineChartData.densities,
                                    label: "种群密度 (相对)",
                                },
                                {
                                    data: lineChartData.averageSizes,
                                    label: "平均尺寸 (相对)",
                                },
                            ]}
                            height={300}
                        />
                        <span>种群密度和平均尺寸 / 任务 </span>
                    </Box>

                </Grid>
            </Grid>
        </Container>
    );
};

export default App;
