package com.zydrunas.imageAnalyzer;

import com.zydrunas.imageAnalyzer.dto.CategoriesDto;
import com.zydrunas.imageAnalyzer.entities.Categories;
import org.springframework.stereotype.Component;

@Component
public class Mapper {

    public Categories toCategories(CategoriesDto categoriesDto) {
        return Categories.builder()
                .prohibited(categoriesDto.getProhibited())
                .name(categoriesDto.getName())
                .build();
    }

    public CategoriesDto toCategoriesDto(Categories categories) {
        return CategoriesDto.builder()
                .prohibited(categories.getProhibited())
                .name(categories.getName())
                .build();
    }
}
