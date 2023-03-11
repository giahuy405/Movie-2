import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../features/Auth/thunk';
import { DesktopOutlined, FileOutlined, PicCenterOutlined, PieChartOutlined, PlaySquareOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;





const AdminLayout = (props) => {
    const dispatch = useDispatch();
    const [activeKey, setActiveKey] = useState();
    useEffect(() => {
        dispatch(fetchProfile)
    }, [])
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const handleMenuClick = useCallback(({ key }) => {
        // setActiveKey(`${key}`)
    })
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const items = [
        {
            key: "img",
            label: <span style={{ color: "#fb4226" }}>TIX VN</span>,
            icon: (
                <img
                    src="https://movie-booking-project.vercel.app/img/headTixLogo.png"
                    alt=""
                    style={{ width: 25 }}
                />
            ),
        },

        {
            key: "1",
            label: <NavLink to="/admin" >User</NavLink>,
            icon: <UserOutlined />,
        },
        {
            key: "2",
            label: <NavLink to="/admin/films" >List films</NavLink>,
            icon: <PicCenterOutlined />,
        },
        {
            key: 4,
            label: <span>Showtime</span>,
            icon: <DesktopOutlined />,
        },

    ];
    return (
        <div>
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div
                        style={{
                            height: 32,
                            margin: 16,
                            background: 'rgba(255, 255, 255, 0.2)',
                        }}
                    />
                    <Menu

                        style={{ position: "relative" }}
                        defaultSelectedKeys={"1"}
                        defaultOpenKeys={["sub1"]}
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={collapsed}
                        items={items}
                    />

                </Sider>
                <Layout className="site-layout">
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    />
                    <Content
                        style={{
                            margin: '0 16px',
                        }}
                    >
                        <Breadcrumb
                            style={{
                                margin: '8px 0',
                            }}
                        >
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                                background: colorBgContainer,
                            }}
                        >
                            {props.children}
                        </div>
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        Ant Design ©2023 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>

        </div >
    );
};

export default AdminLayout;