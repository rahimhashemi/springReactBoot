package com.example.spring.report;

public class ReportJob {
    private String jobId;
    private String reportName;

    // Constructor, getters, and setters
    public ReportJob(String jobId, String reportName) {
        this.jobId = jobId;
        this.reportName = reportName;
    }

    public String getJobId() {
        return jobId;
    }

    public String getReportName() {
        return reportName;
    }
}