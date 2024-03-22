package com.zydrunas.imageAnalyzer.service;

import com.zydrunas.imageAnalyzer.dao.CategoriesDao;
import com.zydrunas.imageAnalyzer.entities.Categories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class CategoriesService {

    CategoriesDao categoriesDao;

    @Autowired
    public CategoriesService(CategoriesDao categoriesDao) {
        this.categoriesDao = categoriesDao;
    }

    public Optional<List<Categories>> getProhibitedCategories() {
        return categoriesDao.getAllProhibited();
    }

    public Optional<List<Categories>> getAllowedCategories() {
        return categoriesDao.getAll();
    }

    public Optional<List<Categories>> getAllCategories() {
        return categoriesDao.getAll();
    }
}
