import React from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import IOCASLogo from "../../logo.png";

const Sidebar = () => {
    const navigate = useNavigate();

    const menuItems = [
        { key: '/', label: '首页', icon: <InfoIcon /> },
        { key: '/frame-recognition', label: '开始识别', icon: <CameraAltIcon /> },
        { key: '/export-results', label: '结果导出', icon: <SaveAltIcon /> },
        { key: '/project-intro', label: '项目介绍', icon: <InfoIcon /> },
        { key: '/al-intro', label: '算法介绍', icon: <InfoIcon /> },
        { key: '/contact-us', label: '联系我们', icon: <ContactMailIcon /> },
    ];

    return (
        <Box sx={{ width: '200px', backgroundColor: '#2E3B55', color: 'white', height: '100vh' }}>
            <img
                src={IOCASLogo}
                alt="IOCAS Logo"
                style={{
                    cursor: 'pointer',
                    height: '100px',
                    margin: '20px auto', // 上下空出20px，左右居中
                    display: 'block',    // 确保图片是块级元素
                }}
                onClick={() => navigate('/')}
            />
            <List>
                {menuItems.map((item, index) => (
                    <React.Fragment key={item.key}>
                        <ListItem button component={NavLink} to={item.key} activeClassName="active">
                            <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItem>
                        {index < menuItems.length - 1 && <Divider sx={{ backgroundColor: '#898887' }} />}
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
};

export default Sidebar;
