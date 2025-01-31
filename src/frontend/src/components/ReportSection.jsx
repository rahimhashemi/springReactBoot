import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { generateReport, getReportStatus, downloadReport } from "../client";

const ReportSection = () => {
    const [reportJobId, setReportJobId] = useState(null); // Track report generation job ID
    const [reportStatus, setReportStatus] = useState(null); // Track report generation status
    const [isGeneratingReport, setIsGeneratingReport] = useState(false); // Track if report is being generated

    const handleGenerateReport = async (values) => {
        setIsGeneratingReport(true);
        try {
            const response = await generateReport(values);
            console.log(response);
            const jobDto = response.data;
            console.log(jobDto);
            const jobId = jobDto.jobId;
            console.log(jobId);
            setReportJobId(jobId);
            message.success("Report generation started. Please wait...");
            await pollReportStatus(jobId);
        } catch (error) {
            console.error('Error generating report:', error);
            message.error("Failed to start report generation.");
            setIsGeneratingReport(false);
        }
    };

    const pollReportStatus = async (jobId) => {
        const interval = setInterval(async () => {
            try {
                const response = await getReportStatus(jobId);
                const status = response.data;
                setReportStatus(status);

                if (status.status === 'COMPLETED') {
                    clearInterval(interval);
                    message.success("Report generation completed!");
                    setIsGeneratingReport(false);
                } else if (status.status === 'FAILED') {
                    clearInterval(interval);
                    message.error("Report generation failed: " + status.message);
                    setIsGeneratingReport(false);
                }
            } catch (error) {
                console.error('Error polling report status:', error);
                clearInterval(interval);
                setIsGeneratingReport(false);
            }
        }, 5000); // Poll every 5 seconds
    };

    const handleDownloadReport = async () => {
        if (!reportJobId) return;

        try {
            const response = await downloadReport(reportJobId);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'report.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading report:', error);
            message.error("Failed to download report.");
        }
    };

    return (
        <div>
            <Form onFinish={handleGenerateReport} layout="vertical">
                <Form.Item
                    label="Report Name"
                    name="reportName"
                    rules={[{ required: true, message: 'Please enter a report name' }]}
                >
                    <Input placeholder="Enter report name" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isGeneratingReport}>
                        Generate Report
                    </Button>
                </Form.Item>
            </Form>
            {reportStatus && (
                <div>
                    <p>Status: {reportStatus.status}</p>
                    <p>Progress: {reportStatus.progress}%</p>
                    {reportStatus.status === 'COMPLETED' && (
                        <Button type="primary" onClick={handleDownloadReport}>
                            Download Report
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ReportSection;