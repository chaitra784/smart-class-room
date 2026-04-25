package com.example.tce.service;

import com.example.tce.entity.*;
import com.example.tce.repository.TimetableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TimetableGeneratorService {

    @Autowired
    private TimetableRepository repo;

    private final List<String> days =
            Arrays.asList("Monday", "Tuesday", "Wednesday", "Thursday", "Friday");

    private final List<String> slots =
            Arrays.asList("9AM", "10AM", "11AM", "1PM", "2PM");

    public List<Timetable> generate(
            List<Subject> subjects,
            List<Faculty> faculties,
            List<Classroom> classrooms
    ) {

        List<Timetable> result = new ArrayList<>();

        // conflict tracking
        Set<String> facultyBusy = new HashSet<>();
        Set<String> roomBusy = new HashSet<>();
        Set<String> slotBusy = new HashSet<>();

        int fIndex = 0;
        int rIndex = 0;

        for (Subject subject : subjects) {

            for (int i = 0; i < 2; i++) { // 2 classes per subject

                boolean assigned = false;

                for (String day : days) {
                    for (String time : slots) {

                        Faculty faculty = faculties.get(fIndex % faculties.size());
                        Classroom classroom = classrooms.get(rIndex % classrooms.size());

                        String facultyKey = faculty.getId() + day + time;
                        String roomKey = classroom.getId() + day + time;
                        String slotKey = subject.getId() + day + time;

                        // ❌ conflict check
                        if (facultyBusy.contains(facultyKey)) continue;
                        if (roomBusy.contains(roomKey)) continue;
                        if (slotBusy.contains(slotKey)) continue;

                        // ✔ create timetable entry
                        Timetable t = new Timetable();
                        t.setSubject(subject);
                        t.setFaculty(faculty);
                        t.setClassroom(classroom);
                        t.setDay(day);
                        t.setTime(time);

                        result.add(t);

                        // mark busy
                        facultyBusy.add(facultyKey);
                        roomBusy.add(roomKey);
                        slotBusy.add(slotKey);

                        assigned = true;
                        break;
                    }
                    if (assigned) break;
                }

                fIndex++;
                rIndex++;
            }
        }

        return repo.saveAll(result);
    }
}