package com.example.tce.controller;

import com.example.tce.entity.Timetable;
import com.example.tce.service.TimetableGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class TimetableController {

    @Autowired
    private TimetableGeneratorService service;

    // ✅ MUST BE POST
    @PostMapping("/timetable/generate")
    public List<Timetable> generateTimetable() {
        return service.generateTimetable();
    }
}