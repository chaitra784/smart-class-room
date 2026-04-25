package com.example.tce.service;

import com.example.tce.entity.Timetable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TimetableSe{

    public List<Timetable> generateTimetable() {

        List<Timetable> list = new ArrayList<>();

        // Example dummy data (replace with logic later)
        Timetable t1 = new Timetable();
        t1.setDay("Monday");
        t1.setTime("10:00 AM");

        list.add(t1);

        return list;
    }
}