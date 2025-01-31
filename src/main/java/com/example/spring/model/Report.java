package com.example.spring.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Report {
    @Id
    private String jobId;
    private String reportName;
    private String filePath;
    private String status;

    // Constructor, getters, and setters
    public Report(String jobId, String reportName, String filePath, String status) {
        this.jobId = jobId;
        this.reportName = reportName;
        this.filePath = filePath;
        this.status = status;
    }

    public Report() {

    }

    public String getJobId() {
        return jobId;
    }

    public String getReportName() {
        return reportName;
    }

    public String getFilePath() {
        return filePath;
    }

    public String getStatus() {
        return status;
    }
}