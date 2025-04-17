import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import IOCASLogo from "../logo.png";

const Home = () => {

    return (
        <Box
            sx={{
                textAlign: 'center',
                height: '100vh', // 修正为充满视口高度
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <img src={IOCASLogo} alt="IOCAS Logo" style={{ height: '100px', marginBottom: '20px' }} />
            <Typography variant="h4" fontStyle={"color: #ffffff"}>水母水螅体人工智能定量分析系统</Typography>
            <Typography variant="subtitle1">Artificial Intelligence Hydra Analysis System</Typography>
            <Button variant="contained" sx={{ marginTop: '20px' }}>了解更多</Button>
        </Box>
    );


};

export default Home;
