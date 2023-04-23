import './App.css';
import {getAllStudents} from "./client"
import {useEffect, useState} from "react";

import {FileOutlined, UserOutlined, DesktopOutlined, PieChartOutlined, TeamOutlined} from '@ant-design/icons';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import StudentTable from "./components/StudentTable";

const {Header, Content, Footer, Sider} = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Option 1', '1', <PieChartOutlined/>),
    getItem('Option 2', '2', <DesktopOutlined/>),
    getItem('User', 'sub1', <UserOutlined/>, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined/>,
        [getItem('Team 1', '6'),
            getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined/>),
];

function App() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const [students, setStudents] = useState([]);

    const fetchStudents = () => {
        getAllStudents()
            .then(data => setStudents(data))
    }

    useEffect(() => {
        console.log("component is mounted!")
        fetchStudents()
    }, [])

    if (students.length <= 0)
        return "no data";

    return <Layout
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
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
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
                        margin: '16px 0',
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
                    <StudentTable students = {students}/>
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

    // return (
    //     <div className="App">
    //         {students.map((student, index) => {
    //             return <p key={index}>{student.id} {student.name}</p>
    //         })}
    //     </div>
    // );
}

export default App;
