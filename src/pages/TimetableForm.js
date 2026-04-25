import React, { useState, useEffect } from "react";
import api from "../services/api";

function TimetableForm({ fetchTimetable }) {

  const [form, setForm] = useState({
    subject: { id: "" },
    faculty: { id: "" },
    classroom: { id: "" },
    day: "",
    time: ""
  });

  const [subjects, setSubjects] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    api.get("/subjects").then(res => setSubjects(res.data));
    api.get("/faculty").then(res => setFaculty(res.data));
    api.get("/classroom").then(res => setClassrooms(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/timetable", form);
    fetchTimetable();
  };

  return (
    <form onSubmit={handleSubmit}>

      <select onChange={(e) => setForm({ ...form, subject: { id: e.target.value } })}>
        <option>Select Subject</option>
        {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>

      <select onChange={(e) => setForm({ ...form, faculty: { id: e.target.value } })}>
        <option>Select Faculty</option>
        {faculty.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
      </select>

      <select onChange={(e) => setForm({ ...form, classroom: { id: e.target.value } })}>
        <option>Select Classroom</option>
        {classrooms.map(c => <option key={c.id} value={c.id}>{c.roomNumber}</option>)}
      </select>

      <input placeholder="Day" onChange={(e) => setForm({ ...form, day: e.target.value })} />
      <input placeholder="Time" onChange={(e) => setForm({ ...form, time: e.target.value })} />

      <button type="submit">Add</button>

    </form>
  );
}

export default TimetableForm;