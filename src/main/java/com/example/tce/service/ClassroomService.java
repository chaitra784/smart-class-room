package com.example.tce.service;

import com.example.tce.entity.Classroom;
import com.example.tce.repository.ClassroomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassroomService {

    @Autowired
    private ClassroomRepository repo;

    public Classroom save(Classroom c) {
        return repo.save(c);
    }

    public List<Classroom> getAll() {
        return repo.findAll();
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
