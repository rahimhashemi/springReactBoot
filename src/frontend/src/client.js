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

export const getReportStatus = async (jobId) => {
    const interval = setInterval(async () => {
        const response = await axios.get(`/api/reports/status/${jobId}`);
        const status = response.data;
        if (status.status === 'COMPLETED') {
            clearInterval(interval);
            await downloadReport(jobId);
        }
    }, 5000); // Poll every 5 seconds
};

// export const generateReport = async () => {
//     const response = await axios.post('/api/reports/generate');
//     console.log(response);
//     const data = response.data;
//     console.log(data);
//     const jobId = data.jobId;
//     console.log(jobId);
//     await getReportStatus(jobId);
// };

export const generateReport = async () => {
    try {
        const response = await axios.post('/api/reports/generate');

        if (!response || !response.data) {
            throw new Error("Invalid response from server");
        }

        console.log("API Response:", response);
        return response; // ✅ Ensure the response is returned
    } catch (error) {
        console.error("Error in generateReport:", error);
        throw error; // ✅ Propagate the error for proper handling
    }
};


export const downloadReport = async (jobId) => {
    const response = await axios.get(`/api/reports/download/${jobId}`, {
        responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'report.pdf');
    document.body.appendChild(link);
    link.click();
};