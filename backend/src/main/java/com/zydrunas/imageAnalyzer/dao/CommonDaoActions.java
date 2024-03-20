package com.zydrunas.imageAnalyzer.dao;

import java.util.List;

public interface CommonDaoActions<T> {
    void save(T t);
    void update(T t);
    List<T> getAll();
    T getByID(Long id);
    void deleteByID(Long id);
}
