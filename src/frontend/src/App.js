import './App.css';
import { getAllStudents } from "./client";
import React, { useEffect, useState } from "react";

import { FileOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Empty, Layout, Menu, Spin, theme } from 'antd';
import StudentTable from "./components/StudentTable";
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";
import FilesSection from "./components/FilesSection"; // Import the new component

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('ALL', '3'),
    ]),
    getItem('Files', 'files', <FileOutlined />), // New menu item for files
];

function App() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [students, setStudents] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [selectedMenu, setSelectedMenu] = useState('1'); // Track selected menu item
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const fetchStudents = () => {
        getAllStudents()
            .then((data) => {
                setStudents(data);
                setFetching(false);
            })
            .catch((error) => {
                console.error('Error fetching students:', error);
                setFetching(false);
            });
    };

    useEffect(() => {
        console.log("Component is mounted!");
        fetchStudents();
    }, []);

    const renderContent = () => {
        if (fetching) {
            return <Spin indicator={antIcon} delay={300} />;
        }

        if (selectedMenu === 'files') {
            return <FilesSection />; // Render the FilesSection when "Files" is selected
        }

        if (students.length <= 0) {
            return <Empty description="No students found." />;
        }

        return <StudentTable students={students} />;
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div
                    style={{
                        height: 32,
                        margin: 16,
                        background: 'rgba(255, 255, 255, 0.2)',
                    }}
                />
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={items}
                    onSelect={({ key }) => setSelectedMenu(key)} // Update selected menu item
                />
            </Sider>
            <Layout className="site-layout">
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
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
                        {renderContent()}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
}

export default App;