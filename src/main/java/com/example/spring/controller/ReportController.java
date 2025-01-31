package com.example.spring.controller;

import com.example.spring.model.JobDto;
import com.example.spring.service.ReportService;
import com.example.spring.model.ReportStatus;
import com.example.spring.util.JsonUtil;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping("/generate")
    public ResponseEntity<JobDto> generateReport() {
        return ResponseEntity.ok(reportService.startReportGeneration());
    }

    @PostMapping("/generate2")
    public ResponseEntity<JobDto> generateReport(@RequestBody Map<String, String> request) {
        String reportName = request.get("reportName");
        return ResponseEntity.ok(reportService.startReportGeneration());
    }

    @GetMapping("/status/{jobId}")
    public ResponseEntity<ReportStatus> getReportStatus(@PathVariable String jobId) {
        ReportStatus status = reportService.getReportStatus(jobId);
        return ResponseEntity.ok(status);
    }

    @GetMapping("/download/{jobId}")
    public ResponseEntity<Resource> downloadReport(@PathVariable String jobId) {
        Resource file = reportService.getReportFile(jobId);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }
}