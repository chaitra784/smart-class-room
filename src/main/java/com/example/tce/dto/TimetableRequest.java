package com.example.tce.dto;

import java.util.List;

public class TimetableRequest {

    private List<Long> subjectIds;
    private List<Long> facultyIds;
    private List<Long> classroomIds;

    // getters & setters

    public List<Long> getSubjectIds() {
        return subjectIds;
    }

    public void setSubjectIds(List<Long> subjectIds) {
        this.subjectIds = subjectIds;
    }

    public List<Long> getFacultyIds() {
        return facultyIds;
    }

    public void setFacultyIds(List<Long> facultyIds) {
        this.facultyIds = facultyIds;
    }

    public List<Long> getClassroomIds() {
        return classroomIds;
    }

    public void setClassroomIds(List<Long> classroomIds) {
        this.classroomIds = classroomIds;
    }
}