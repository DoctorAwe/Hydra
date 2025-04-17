import React, { useState } from 'react';
import { Box, Button, List, ListItem, ListItemText, Typography, Avatar } from '@mui/material';
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

const ExportResults = () => {
    const { files } = useSelector((state) => state.file);
    const [exporting, setExporting] = useState(false);

    const handleExport = () => {
        setExporting(true);

        // 构建 CSV 数据
        const csvRows = [
            'Filename,TargetCount,Data', // 修改标题行
            ...files.map(file => {
                const targetCount = file.isCompleted ? file.data.length : 0; // 目标数量，未完成为 0
                const data = file.data.map(d => d.join(';')).join('|'); // 示例格式化数据
                return `${file.path},${targetCount},"${data}"`;
            }),
        ];

        // 创建 Blob 并下载
        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'recognized_images.csv');

        setExporting(false);
    };


    return (
        <Box sx={{ padding: '20px', height: '100%' }}>


            <List
                sx={{
                    maxHeight: '400px', // 固定高度
                    overflowY: 'auto',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    padding: '10px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    opacity:"90%"
                }}
            >
                {files.length > 0 ? (
                    files.map((file, index) => (
                        <ListItem
                            key={index}
                            divider
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '10px 15px',
                                backgroundColor: index % 2 === 0 ? '#ffffff' : '#f0f0f0',
                                '&:hover': {
                                    backgroundColor: '#e0f7fa',
                                },
                                borderRadius: '5px',
                            }}
                        >
                            <Avatar
                                sx={{ backgroundColor: file.isCompleted ? 'green' : 'orange', marginRight: '10px' }}
                            >
                                {file.isCompleted ? <CheckCircleIcon /> : <PendingIcon />}
                            </Avatar>
                            <ListItemText
                                primary={file.name}
                                secondary={
                                    file.isCompleted
                                        ? `已完成 - 识别目标数: ${file.data.length}`
                                        : '待识别'
                                }
                                primaryTypographyProps={{ fontWeight: 'bold' }}
                            />
                        </ListItem>
                    ))
                ) : (
                    <Typography variant="body1" sx={{ textAlign: 'center', color: '#888' }}>
                        暂无识别结果
                    </Typography>
                )}
            </List>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleExport}
                    disabled={exporting || files.length === 0}
                    sx={{
                        padding: '10px 20px',
                        fontWeight: 'bold',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                        '&:hover': {
                            backgroundColor: '#1565c0',
                        },
                    }}
                >
                    {exporting ? '正在导出...' : '导出 CSV 文件'}
                </Button>
            </Box>
        </Box>
    );
};

export default ExportResults;
