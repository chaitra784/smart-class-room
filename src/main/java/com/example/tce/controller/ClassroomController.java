package com.example.tce.controller;

import com.example.tce.entity.Classroom;
import com.example.tce.repository.ClassroomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classroom")
@CrossOrigin("*")
public class ClassroomController {

    @Autowired
    private ClassroomRepository repo;

    @PostMapping
    public Classroom add(@RequestBody Classroom c) {
        return repo.save(c);
    }

    @GetMapping
    public List<Classroom> getAll() {
        return repo.findAll();
    }
}