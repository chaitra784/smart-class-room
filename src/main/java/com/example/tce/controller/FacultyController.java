package com.example.tce.controller;

import com.example.tce.entity.Faculty;
import com.example.tce.repository.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculty")
@CrossOrigin("*")
public class FacultyController {

    @Autowired
    private FacultyRepository repo;

    // ➤ Add Faculty
    @PostMapping
    public Faculty add(@RequestBody Faculty f) {
        return repo.save(f);
    }

    // ➤ Get All Faculty
    @GetMapping
    public List<Faculty> getAll() {
        return repo.findAll();
    }

    // ➤ Get Faculty by ID (optional but useful)
    @GetMapping("/{id}")
    public Faculty getById(@PathVariable Long id) {
        return repo.findById(id).orElse(null);
    }

    // ➤ Delete Faculty
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}