import React, {useCallback, useEffect, useState} from 'react';
import { Box, Container, Divider, Grid, IconButton } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import AddIcon from '@mui/icons-material/Add';
import { message, requests } from "../../utils";
import LoadingButton from "@mui/lab/LoadingButton";
import { ImageSlider, ImageUploadAndAnnotate } from "../../components";
import {Send} from "@mui/icons-material";
import {BarChart, LineChart} from '@mui/x-charts';
import {Typography, Button, List, ListItem, ListItemText,ListItemIcon } from '@mui/material';
import IOCASLogo from '../../logo.png';
import HomeIcon from '@mui/icons-material/Home';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import BarChartIcon from '@mui/icons-material/BarChart';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Result from "./ExportResult";


const App = () => {
    const [files, setFiles] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [disable, setDisable] = useState(true);
    const [loadingText, setLoadingText] = useState("推理")




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



    const main =
        (<Container maxWidth={false} style={{ height: '100vh', overflow: 'hidden', padding: '20px' ,backgroundColor:"#F0F0F0"}}>
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

            </Grid>
        </Container>
    );



    const Sidebar = ({ onNavigate }) => {
        const menuItems = [
            { key: 'frameRecognition', label: '开始识别', icon: <CameraAltIcon /> },
            { key: 'exportResults', label: '结果导出', icon: <SaveAltIcon /> },
            { key: 'projectIntro', label: '项目介绍', icon: <InfoIcon /> },
            { key: 'ALIntro', label: '算法介绍', icon: <InfoIcon /> },
            { key: 'contactUs', label: '联系我们', icon: <ContactMailIcon /> },
        ];

        return (
            <Box
                sx={{
                    width: '200px',
                    backgroundColor: '#2E3B55',
                    height: '100vh',
                    color: 'white',
                    padding: '20px 0 20px 0',
                    position: 'fixed',
                    textAlign: 'center',
                }}
            >
                <img
                    src={IOCASLogo}
                    alt="IOCAS Logo"
                    style={{ cursor: 'pointer', height: '100px', marginBottom: '20px' }}
                    onClick={() => onNavigate('home')}
                />
                <List>
                    {menuItems.map((item, index) => (
                        <React.Fragment key={item.key}>
                            <ListItem
                                button
                                sx={{
                                    color: 'white',
                                    textAlign: 'center',
                                    flexDirection: 'column', // 图标和文字垂直排列
                                    '&:hover': {
                                        backgroundColor: '#394867',
                                    },
                                }}
                                onClick={() => onNavigate(item.key)}
                            >
                                <ListItemIcon sx={{ color: 'white', justifyContent: 'center', minWidth: '0' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.label} sx={{ textAlign: 'center', marginTop: '5px' }} />
                            </ListItem>
                            {index < menuItems.length - 1 && <Divider sx={{ backgroundColor: '#898887' }} />}
                        </React.Fragment>
                    ))}
                </List>
            </Box>
        );
    };

    const Header = () => {

        return (
            <Box
                sx={{
                    textAlign: 'center',
                    backgroundSize: '100% 100%', // 拉伸背景图片，使其铺满容器
                    backgroundPosition: 'center', // 居中背景图片
                    backgroundRepeat: 'no-repeat', // 不重复背景图片
                    backgroundImage: 'url(/background.webp)',
                    height: '100vh', // 修正为充满视口高度
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <img src={IOCASLogo} alt="IOCAS Logo" style={{ height: '100px', marginBottom: '20px' }} />
                <Typography variant="h4">水母水螅体人工智能定量分析系统</Typography>
                <Typography variant="subtitle1">Artificial Intelligence Hydra Analysis System</Typography>
                <Button variant="contained" sx={{ marginTop: '20px' }}>了解更多</Button>
            </Box>
        );


    };

    const FrameRecognition = () => main;
    const Metrics = () => <Typography variant="h5">批量页面内容</Typography>;
    const ExportResults = () => <Typography variant="h5">结果导出页面内容</Typography>;
    const ProjectIntro = () => <Typography variant="h5">项目介绍页面内容</Typography>;
    const InclusionIntro = () => <Typography variant="h5">算法介绍页面内容</Typography>;
    const ContactUs = () => <Typography variant="h5">联系我们页面内容</Typography>;

    const App1 = () => {
        const [currentPage, setCurrentPage] = useState('home');

        const renderPage = () => {
            switch (currentPage) {
                case 'home':
                    return <Header/>;
                case 'frameRecognition':
                    return main;
                case 'metrics':
                    return <Metrics />;
                case 'exportResults':
                    return <Result files={files} />;
                case 'projectIntro':
                    return <ProjectIntro />;
                case 'inclusionIntro':
                    return <InclusionIntro />;
                case 'contactUs':
                    return <ContactUs />;
                default:
                    return <Typography variant="h5">页面未找到</Typography>;
            }
        };

        return (
            <Box sx={{ display: 'flex', height: '100vh' }}> {/* 确保 App 的高度充满视口 */}
                <Sidebar onNavigate={setCurrentPage} />
                <Box sx={{ marginLeft: '200px', width: '100%' }}>
                    <Box sx={{ width: '100%', height: '100vh' }}>{renderPage()}</Box>
                </Box>
            </Box>
        );
    };


    return <App1 />;



};

export default App;


