package com.example.spring.service;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class FileService {

    private static final String UPLOAD_DIR = "src/main/resources/uploads/";

    public List<String> listFiles() {
        List<String> fileNames = new ArrayList<>();
        try {
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (uploadPath.toFile().exists()) {
                fileNames = List.of(Objects.requireNonNull(uploadPath.toFile().list()));
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
        return fileNames;
    }

    public Resource downloadFile(String filename) throws MalformedURLException {
        try {
            Path filePath = Paths.get(UPLOAD_DIR).resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                return (resource);
            } else {
                return null;
            }
        } catch (IOException e) {
            e.printStackTrace();
            throw e;
        }
    }

}
