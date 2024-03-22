package com.zydrunas.imageAnalyzer.dao;

import com.zydrunas.imageAnalyzer.entities.Categories;
import com.zydrunas.imageAnalyzer.repository.CategoriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class CategoriesDao implements CommonDaoActions<Categories> {

    CategoriesRepository repository;

    @Autowired
    public CategoriesDao(CategoriesRepository repository) {
        this.repository = repository;
    }

    @Override
    public void save(Categories category) {
        repository.save(category);
    }

    @Override
    public void update(Categories category) {
        repository.save(category);
    }

    @Override
    public Optional<List<Categories>> getAll() {
        return Optional.of(repository.findAll());
    }

    public Optional<List<Categories>> getAllProhibited() {
        return repository.findAllByProhibitedIsTrue();
    }

    public Optional<List<Categories>> getAllAllowed() {
        return repository.findAllByProhibitedIsFalse();
    }

    @Override
    public Optional<Categories> getByID(Long id) {
        return Optional.of(repository.getReferenceById(id));
    }

    @Override
    public void deleteByID(Long id) {
        repository.deleteById(id);
    }

    public void saveAll(List<Categories> categories) {
        repository.saveAll(categories);
    }

    public void updateAll(List<Categories> categories) {
        repository.deleteAll();
        repository.saveAll(categories);
    }
}
