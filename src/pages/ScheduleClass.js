import React, { useEffect, useState } from "react";
import api from "../services/api";

function ScheduleClass() {

  const [subjects, setSubjects] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [classrooms, setClassrooms] = useState([]);

  const [form, setForm] = useState({
    subject: "",
    faculty: "",
    classroom: "",
    day: "",
    time: ""
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const s = await api.get("/subject");
    const f = await api.get("/faculty");
    const c = await api.get("/classroom");

    setSubjects(s.data);
    setFaculty(f.data);
    setClassrooms(c.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const schedule = async () => {
    try {
      await api.post("/timetable/schedule", form);
      alert("Class Scheduled Successfully!");
    } catch (err) {
      console.log(err);
      alert("Error scheduling class");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📅 Schedule Class</h2>

      {/* SUBJECT */}
      <select name="subject" onChange={handleChange}>
        <option>Select Subject</option>
        {subjects.map(s => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>

      {/* FACULTY */}
      <select name="faculty" onChange={handleChange}>
        <option>Select Faculty</option>
        {faculty.map(f => (
          <option key={f.id} value={f.id}>{f.name}</option>
        ))}
      </select>

      {/* CLASSROOM */}
      <select name="classroom" onChange={handleChange}>
        <option>Select Classroom</option>
        {classrooms.map(c => (
          <option key={c.id} value={c.id}>{c.roomNumber}</option>
        ))}
      </select>

      <br /><br />

      {/* DAY */}
      <input
        name="day"
        placeholder="Day"
        onChange={handleChange}
      />

      {/* TIME */}
      <input
        name="time"
        placeholder="Time"
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={schedule}>
        Schedule Class
      </button>

    </div>
  );
}

export default ScheduleClass;