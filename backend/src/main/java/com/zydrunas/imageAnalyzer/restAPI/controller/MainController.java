package com.zydrunas.imageAnalyzer.restAPI.controller;

import com.zydrunas.imageAnalyzer.dto.CategoriesDto;
import com.zydrunas.imageAnalyzer.restAPI.service.DetectLabelsService;
import com.zydrunas.imageAnalyzer.service.CategoriesService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(
        origins = {
                "http://localhost:3000"
        }
)
@RestController
@Log4j2
public class MainController {

    DetectLabelsService labelsService;
    CategoriesService categoriesService;

    @Autowired
    public MainController(DetectLabelsService labelsService, CategoriesService categoriesService) {
        this.labelsService = labelsService;
        this.categoriesService = categoriesService;
    }

    @PostMapping("/upload-image")
    public ResponseEntity<String> uploadImage(MultipartFile file) {
        log.info("Received image from client in /upload-images");
        labelsService.DetectLabels(file);
        return ResponseEntity.status(HttpStatus.OK).body("Approved");
    }

    @GetMapping("/categories")
    public ResponseEntity<List<CategoriesDto>> getCategories() {
        log.info("Sent categories to client from /categories");
        return new ResponseEntity<>(categoriesService.getAllCategories(), HttpStatus.OK);
    }

    @PutMapping("/update-categories")
    public ResponseEntity<?> updateCategories(@RequestBody List<CategoriesDto> categories) {
        log.info("Received categories to update /update-categories");
        categoriesService.updateCategories(categories);
        return ResponseEntity.ok().build();
    }
}
