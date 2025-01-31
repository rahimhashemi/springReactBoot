package com.example.spring.service;

import com.example.spring.model.JobDto;
import com.example.spring.model.ReportStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Slf4j
public class ReportService {
    private static final String REPORT_DIR = "src/main/resources/reports/";

    private final Map<String, ReportStatus> reportStatusMap = new ConcurrentHashMap<>();

    @Async
    public JobDto startReportGeneration() {
        log.info("ReportService.startReportGeneration");
        String jobId = UUID.randomUUID().toString();
        // Simulate a long-running task
        log.info("Simulate a long-running task");
        CompletableFuture.runAsync(() -> {
            // Update status as the job progresses
            log.info("Update status as the job progresses");
            reportStatusMap.put(jobId, new ReportStatus("IN_PROGRESS", 0));

            // Simulate work
            log.info("Simulate work");
            for (int i = 0; i <= 100; i += 10) {
                try {
                    log.info("Simulate delay");
                    Thread.sleep(1000); // Simulate delay
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                reportStatusMap.put(jobId, new ReportStatus("IN_PROGRESS", i));
            }

            log.info("Mark job as completed");
            // Mark job as completed
            reportStatusMap.put(jobId, new ReportStatus("COMPLETED", 100));
        });
        log.info("jID" + jobId);
        return new JobDto(jobId);
    }


    public ReportStatus getReportStatus(String jobId) {
        log.info("ReportService.getReportStatus");
        log.info("jobId = " + jobId);
        return reportStatusMap.getOrDefault(jobId, new ReportStatus("NOT_FOUND", 0, "Job not found"));
    }


    public Resource getReportFile(String jobId) {
        // Fetch file from storage
        log.info("Fetch file from storage");
        try {
            log.info("jobId= " + jobId);
            Path filePath = Paths.get(REPORT_DIR).resolve("TestZip.zip").normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                return (resource);
            } else {
                return null;
            }
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}