import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import ParticlesBg from 'particles-bg'; // 引入 particles-bg

const Layout = () => (
    <div style={{ display: 'flex', height: '100vh', position: 'relative' }}>
        <Sidebar />
        <main
            style={{
                flex: 1,
                overflow: 'hidden', // 禁止滚动条
                position: 'relative',
                backgroundColor: '#1e3c72',

            }}
        >

        {/* 动态背景 */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%', // 修改为 100% 而不是 100vh
                    zIndex: 0, // 确保粒子背景在内容后面
                }}
            >
                <ParticlesBg type="circle" bg={false} />
            </div>

            {/* 页面内容 */}
            <div style={{ position: 'relative', zIndex: 1,}}>
                <Outlet /> {/* 动态加载的页面内容 */}
            </div>
        </main>
    </div>
);

export default Layout;
