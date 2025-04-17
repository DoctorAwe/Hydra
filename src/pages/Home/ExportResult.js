import React, { useState } from 'react';
import { Box, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import { saveAs } from 'file-saver';
import {useSelector} from "react-redux";

const ExportResults = () => {
    const { files } = useSelector((state) => state.file);
    const [exporting, setExporting] = useState(false);

    const handleExport = () => {
        setExporting(true);

        // 构建 CSV 数据
        const csvRows = [
            'Filename,Status,Data',
            ...files.map(file => {
                const status = file.isCompleted ? 'Completed' : 'Pending';
                const data = file.data.map(d => d.join(';')).join('|'); // 示例格式化数据
                return `${file.name},${status},"${data}"`;
            }),
        ];

        // 创建 Blob 并下载
        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'recognized_images.csv');

        setExporting(false);
    };

    return (
        <Box sx={{ padding: '20px', backgroundColor: '#F9F9F9', height: '100%' }}>
            <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                已识别的图片信息
            </Typography>

            {files.length > 0 ? (
                <List sx={{ maxHeight: '60vh', overflowY: 'auto', backgroundColor: '#FFF', borderRadius: '8px', padding: '10px' }}>
                    {files.map((file, index) => (
                        <ListItem key={index} divider>
                            <ListItemText
                                primary={file.name}
                                secondary={
                                    file.isCompleted
                                        ? `已完成 - 识别目标数: ${file.data.length}`
                                        : '待识别'
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant="body1">暂无识别结果</Typography>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleExport}
                    disabled={exporting || files.length === 0}
                >
                    {exporting ? '正在导出...' : '导出 CSV 文件'}
                </Button>
            </Box>
        </Box>
    );
};

export default ExportResults;