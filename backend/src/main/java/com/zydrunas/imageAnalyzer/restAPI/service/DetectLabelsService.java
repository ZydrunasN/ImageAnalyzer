package com.zydrunas.imageAnalyzer.restAPI.service;

import com.google.cloud.vision.v1.*;
import com.google.protobuf.ByteString;
import com.zydrunas.imageAnalyzer.pojo.Label;
import com.zydrunas.imageAnalyzer.pojo.ValidatedImageResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@Log4j2
public class DetectLabelsService {

    LabelValidationService labelValidationService;

    @Autowired
    public DetectLabelsService(LabelValidationService labelValidationService) {
        this.labelValidationService = labelValidationService;
    }

    public ValidatedImageResponse DetectLabels(MultipartFile file) {
        List<Label> labels = vision(file);
        return labelValidationService.validate(labels);
    }

    public List<Label> vision(MultipartFile file) {
        if(file == null) {
            log.warn("Tried to send null file to vision");
            return Collections.emptyList();
        }

        try (ImageAnnotatorClient vision = ImageAnnotatorClient.create()) {
            List<Label> labels = new ArrayList<>();

            byte[] data = file.getBytes();

            ByteString imgBytes = ByteString.copyFrom(data);

            List<AnnotateImageRequest> requests = new ArrayList<>();
            Image img = Image.newBuilder().setContent(imgBytes).build();
            Feature feat = Feature.newBuilder().setType(Feature.Type.LABEL_DETECTION).build();
            AnnotateImageRequest request =
                    AnnotateImageRequest.newBuilder().addFeatures(feat).setImage(img).build();
            requests.add(request);

            BatchAnnotateImagesResponse response = vision.batchAnnotateImages(requests);
            List<AnnotateImageResponse> responses = response.getResponsesList();

            for (AnnotateImageResponse res : responses) {
                if (res.hasError()) {
                    log.error("Error: "+ res.getError().getMessage());
                    return Collections.emptyList();
                }

                for (EntityAnnotation annotation : res.getLabelAnnotationsList()) {
                    labels.add(new Label(annotation.getDescription(), annotation.getScore()));
                }
            }
            return labels;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
