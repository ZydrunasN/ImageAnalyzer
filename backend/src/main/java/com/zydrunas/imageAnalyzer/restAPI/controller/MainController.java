package com.zydrunas.imageAnalyzer.restAPI.controller;

import com.zydrunas.imageAnalyzer.Mapper;
import com.zydrunas.imageAnalyzer.dto.CategoriesDto;
import com.zydrunas.imageAnalyzer.entities.Categories;
import com.zydrunas.imageAnalyzer.pojo.ValidatedImageResponse;
import com.zydrunas.imageAnalyzer.restAPI.service.DetectLabelsService;
import com.zydrunas.imageAnalyzer.service.CategoriesService;
import com.zydrunas.imageAnalyzer.integration.service.OpenAICallsService;
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
    OpenAICallsService openAICallsService;

    @Autowired
    public MainController(DetectLabelsService labelsService, CategoriesService categoriesService, OpenAICallsService openAICallsService) {
        this.labelsService = labelsService;
        this.categoriesService = categoriesService;
        this.openAICallsService = openAICallsService;
    }

    @PostMapping("/upload-image")
    public ResponseEntity<ValidatedImageResponse> uploadImage(MultipartFile file) {
        log.info("Received image from client in /upload-images");
        var validatedResponse = labelsService.DetectLabels(file);
        return new ResponseEntity<>(validatedResponse,HttpStatus.OK);
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
