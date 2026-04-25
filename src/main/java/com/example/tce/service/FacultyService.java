package com.example.tce.service;

import com.example.tce.entity.Faculty;
import com.example.tce.repository.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacultyService {

    @Autowired
    private FacultyRepository repo;

    public Faculty save(Faculty f) {
        return repo.save(f);
    }

    public List<Faculty> getAll() {
        return repo.findAll();
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}