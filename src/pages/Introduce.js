import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button, Avatar, List, ListItem, ListItemText } from '@mui/material';
import { GitHub, Code, PlayArrow } from '@mui/icons-material';

const ProjectIntro = () => {
    return (
        <Container sx={{ padding: '40px', maxWidth: '100%' }}>
            {/* 项目标题和简介 */}
            <Box sx={{ textAlign: 'center', marginBottom: '40px' }}>
                <Typography variant="h5" sx={{ color: '#888', marginBottom: '20px' }}>
                    [项目简短介绍][目标用户][主要功能]。
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PlayArrow />}
                    sx={{ marginRight: '15px', fontWeight: 'bold' }}
                >
                    Demo
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<GitHub />}
                    sx={{ fontWeight: 'bold' }}
                >
                    GitHub
                </Button>
            </Box>

            {/* 功能介绍 */}
            <Box sx={{ marginBottom: '40px' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
                    项目功能
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Avatar sx={{ backgroundColor: '#1976d2', marginBottom: '20px' }}>
                                    <Code />
                                </Avatar>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                    功能 1
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#555' }}>
                                    详细描述
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Avatar sx={{ backgroundColor: '#1976d2', marginBottom: '20px' }}>
                                    <Code />
                                </Avatar>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                    功能 2
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#555' }}>
                                    详细描述
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Avatar sx={{ backgroundColor: '#1976d2', marginBottom: '20px' }}>
                                    <Code />
                                </Avatar>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                    功能 3
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#555' }}>
                                    详细描述
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* 技术栈 */}
            <Box sx={{ marginBottom: '40px' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
                    技术栈
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} sm={3}>
                        <Card sx={{ padding: '20px', textAlign: 'center' }}>
                            <Avatar sx={{ backgroundColor: '#1976d2', marginBottom: '15px', marginX: 'auto' }}>
                                <img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/react.svg" alt="React" width="30" />
                            </Avatar>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                React
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#555' }}>
                                前端开发
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Card sx={{ padding: '20px', textAlign: 'center' }}>
                            <Avatar sx={{ backgroundColor: '#1976d2', marginBottom: '15px', marginX: 'auto' }}>
                                <img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/node-dot-js.svg" alt="Node.js" width="30" />
                            </Avatar>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Node.js
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#555' }}>
                                用于构建高效、可扩展的网络应用程序。
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Card sx={{ padding: '20px', textAlign: 'center' }}>
                            <Avatar sx={{ backgroundColor: '#1976d2', marginBottom: '15px', marginX: 'auto' }}>
                                <img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/mongodb.svg" alt="MongoDB" width="30" />
                            </Avatar>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>

                            </Typography>
                            <Typography variant="body2" sx={{ color: '#555' }}>

                            </Typography>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* 如何使用 */}

        </Container>
    );
};

export default ProjectIntro;
