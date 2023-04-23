import React from "react";
import {Table} from 'antd'

export default function StudentTable({students}) {

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            id: 'id',
        },{
            title: 'Name',
            dataIndex: 'name',
            id: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            id: 'email',
        }, {
            title: 'Gender',
            dataIndex: 'gender',
            id: 'gender',
        },
    ];

    return <Table dataSource={students} columns={columns}/>;
}


