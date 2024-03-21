package com.zydrunas.imageAnalyzer.restAPI.controller;

import com.zydrunas.imageAnalyzer.restAPI.service.DetectLabelsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(
        origins = {
                "http://localhost:3000"
        }
)
@RestController
public class MainController {

    DetectLabelsService labelsService;

    @Autowired
    public MainController(DetectLabelsService labelsService) {
        this.labelsService = labelsService;
    }

    @PostMapping("/upload-image")
    public void uploadImage(MultipartFile file) {
        labelsService.DetectLabels(file);
    }
}
