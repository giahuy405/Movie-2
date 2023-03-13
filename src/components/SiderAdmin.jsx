import { LeftOutlined, PicCenterOutlined, PlaySquareOutlined, PlusCircleOutlined, RightOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { useState,memo } from 'react';
import { useNavigate } from 'react-router-dom';

const items = [
    {
        key: '/admin',
        icon: <UserOutlined />,
        label: "Người dùng"
    },
    // {
    //     key: '/admin/films1',
    //     icon: <PlaySquareOutlined />,
    //     label: "Films",
    //     children: [
    //         {
    //             key: '/admin/films',
    //             icon: <PlaySquareOutlined />,
    //             label: "Danh sách phim",
    //         },
    //         {
    //             key: '/admin/films/addnew',
    //             icon: <PlusCircleOutlined />,
    //             label: "Thêm phim mới",
    //         }
    //     ]
    // },
    {
        key: '/admin/films',
        icon: <PlaySquareOutlined />,
        label: "Danh sách phim",
    },
    {
        key: '/admin/films/addnew',
        icon: <PlusCircleOutlined />,
        label: "Thêm phim mới",
    }
    // {
    //     key: '/admin/showtimes',
    //     icon: <PicCenterOutlined />,
    //     label: "Lịch chiếu phim"
    // },
];
const SiderAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()
 
    return (
        <Sider  collapsed={true} onCollapse={(value) => setCollapsed(value)}>
            <div>
                <img width={45} className='mb-4 mt-6 mx-auto' src="https://movie-booking-project.vercel.app/img/headTixLogo.png" alt="" />
            </div>
            <Menu theme="dark" defaultSelectedKeys={[window.location.pathname]} mode="inline"
                onClick={({ key }) => {
                    navigate(key)
                }}
                items={items} />
        </Sider>
    );
};

export default memo(SiderAdmin);