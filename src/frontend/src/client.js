import axios from 'axios';

export const getAllStudents = () => {
    return axios.get('/api/students')
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching students:', error);
            throw error;
        });
};

export const getAllFiles = () => {
    return axios.get('/api/files')
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching files:', error);
            throw error;
        });
};

export const downloadFile = (filename) => {
    return axios.get(`/api/files/${filename}`, {
        responseType: 'blob',
    })
        .then(response => response)
        .catch(error => {
            console.error('Error downloading file:', error);
            throw error;
        });
};