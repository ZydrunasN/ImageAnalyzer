package com.zydrunas.imageAnalyzer.repository;

import com.zydrunas.imageAnalyzer.entities.Categories;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoriesRepository extends JpaRepository<Categories, Long> {
    Optional<List<Categories>> findAllByisProhibitedIsTrue();
    Optional<List<Categories>> findAllByisProhibitedIsFalse();
}
