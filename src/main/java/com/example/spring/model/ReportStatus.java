package com.example.spring.model;

public class ReportStatus {
    private String status; // e.g., "IN_PROGRESS", "COMPLETED", "FAILED"
    private int progress; // e.g., 50 (for 50%)
    private String message; // Optional: Additional information or error message

    // Constructor
    public ReportStatus(String status, int progress) {
        this.status = status;
        this.progress = progress;
    }

    public ReportStatus(String status, int progress, String message) {
        this.status = status;
        this.progress = progress;
        this.message = message;
    }

    // Getters and Setters
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getProgress() {
        return progress;
    }

    public void setProgress(int progress) {
        this.progress = progress;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}