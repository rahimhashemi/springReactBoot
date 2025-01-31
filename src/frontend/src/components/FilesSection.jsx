import React, { useEffect, useState } from 'react';
import { List, Button, Spin } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { getAllFiles, downloadFile } from '../client';

const FilesSection = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = () => {
        getAllFiles()
            .then((data) => {
                setFiles(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching files:', error);
                setLoading(false);
            });
    };

    const handleDownload = (filename) => {
        downloadFile(filename)
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch((error) => {
                console.error('Error downloading file:', error);
            });
    };

    if (loading) {
        return <Spin />;
    }

    return (
        <List
            dataSource={files}
            renderItem={(file) => (
                <List.Item>
                    <span>{file}</span>
                    <Button
                        type="primary"
                        icon={<DownloadOutlined />}
                        onClick={() => handleDownload(file)}
                    >
                        Download
                    </Button>
                </List.Item>
            )}
        />
    );
};

export default FilesSection;