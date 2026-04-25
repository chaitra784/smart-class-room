package com.example.tce.controller;

import com.example.tce.entity.Subject;
import com.example.tce.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subject")
@CrossOrigin("*")
public class SubjectController {

    @Autowired
    private SubjectRepository repo;

    @PostMapping
    public Subject add(@RequestBody Subject s) {
        return repo.save(s);
    }

    @GetMapping
    public List<Subject> getAll() {
        return repo.findAll();
    }
}