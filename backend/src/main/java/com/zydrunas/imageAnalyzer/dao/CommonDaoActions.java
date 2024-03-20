package com.zydrunas.imageAnalyzer.dao;

import java.util.List;
import java.util.Optional;

public interface CommonDaoActions<T> {
    void save(T t);
    void update(T t);
    Optional<List<T>> getAll();
    Optional<T> getByID(Long id);
    void deleteByID(Long id);
}
