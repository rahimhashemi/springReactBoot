package com.example.spring.service;

import com.example.spring.model.Report;
import com.example.spring.report.ReportJob;
import com.example.spring.repository.ReportRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;

//@Component
public class ReportWorker {

    private final ReportRepository reportRepository;

    public ReportWorker(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    @RabbitListener(queues = "reportQueue")
    public void processReport(ReportJob job) {
        // Simulate file generation
        String filePath = generateReportFile(job.getReportName());

        // Save file metadata to the database
        reportRepository.save(new Report(job.getJobId(), job.getReportName(), filePath, "COMPLETED"));
    }

    private String generateReportFile(String reportName) {
        // Generate the file and return its path
        return "/path/to/generated/report.pdf";
    }
}