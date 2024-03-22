package com.zydrunas.imageAnalyzer.service;

import com.zydrunas.imageAnalyzer.Mapper;
import com.zydrunas.imageAnalyzer.dao.CategoriesDao;
import com.zydrunas.imageAnalyzer.dto.CategoriesDto;
import com.zydrunas.imageAnalyzer.entities.Categories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoriesService {

    CategoriesDao categoriesDao;
    Mapper mapper;

    @Autowired
    public CategoriesService(CategoriesDao categoriesDao, Mapper mapper) {
        this.categoriesDao = categoriesDao;
        this.mapper = mapper;
    }

    public List<Categories> getProhibitedCategories() {
        return categoriesDao.getAllProhibited().orElse(Collections.emptyList());
    }

    public List<Categories> getAllowedCategories() {
        return categoriesDao.getAll().orElse(Collections.emptyList());
    }

    public List<CategoriesDto> getAllCategories() {
        List<Categories> categories = categoriesDao.getAll().orElse(Collections.emptyList());
        return categories.stream().map(mapper::toCategoriesDto).collect(Collectors.toList());
    }

    public void updateCategories(List<CategoriesDto> categoriesDto) {
        var categories = categoriesDto.stream().map(mapper::toCategories).toList();
        categoriesDao.updateAll(categories);
    }
}
