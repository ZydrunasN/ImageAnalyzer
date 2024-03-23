package com.zydrunas.imageAnalyzer.restAPI.service;

import com.zydrunas.imageAnalyzer.entities.Categories;
import com.zydrunas.imageAnalyzer.integration.service.OpenAICallsService;
import com.zydrunas.imageAnalyzer.pojo.Label;
import com.zydrunas.imageAnalyzer.pojo.ValidatedImageResponse;
import com.zydrunas.imageAnalyzer.service.CategoriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class LabelValidationService {

    CategoriesService categoriesService;
    OpenAICallsService openAICallsService;

    @Autowired
    public LabelValidationService(CategoriesService categoriesService, OpenAICallsService openAICallsService) {
        this.categoriesService = categoriesService;
        this.openAICallsService = openAICallsService;
    }


    public ValidatedImageResponse validate(List<Label> labels) {
        var prohibitedCategories = categoriesService.getProhibitedCategories();


        var validatedImageResponse = compareToCategories(labels,prohibitedCategories);
        if(validatedImageResponse != null) return validatedImageResponse;

        return validateWithOpenAI(labels,prohibitedCategories);
    }


    /* Sending validateCategories number of prohibited categories with label which
       has the highest score of object seen in image to OpenAI for comparing
     */
    private ValidatedImageResponse validateWithOpenAI(List<Label> labels, List<Categories> prohibitedCategories) {
        final int validateCategories = 10;
        String categories = "";
        int count = 0;

        String filteredLabel= labels.stream()
                .max(Comparator.comparing(Label::getScore)).get().getName();

        var prohibited = new LinkedList<>(prohibitedCategories);

        ListIterator<Categories> iter = prohibited.listIterator();

        while(iter.hasNext()) {
            String category = iter.next().getName();

            if(count == 0) {
                categories = category;
            } else {
                categories += ", "+category;
            }

            if(count >= validateCategories || !iter.hasNext()) {
                String response = openAICallsService.callOpenAi(filteredLabel,categories);
                count = 0;
                if (!response.equalsIgnoreCase("no")) {
                    return new ValidatedImageResponse(false, response);
                }
            } else count++;
        }

        return new ValidatedImageResponse(true, "");
    }

    public ValidatedImageResponse compareToCategories (List<Label> labels, List<Categories> prohibitedCategories) {
        final double lowestScore = 0.5;

        for (Label label: labels) {
            for (Categories category: prohibitedCategories) {
                if(category.getName().toLowerCase().contains(label.getName().toLowerCase())
                && label.getScore() >= lowestScore) {
                    return new ValidatedImageResponse(false, category.getName());
                }
            }
        }
        return null;
    }
}
