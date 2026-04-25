import React, { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {

  const [subjects, setSubjects] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      const s = await api.get("/subject");
      const f = await api.get("/faculty");
      const c = await api.get("/classroom");
      const t = await api.get("/timetable");

      setSubjects(s.data);
      setFaculty(f.data);
      setClassrooms(c.data);
      setTimetable(t.data);
    } catch (err) {
      console.log(err);
    }
  };

  const generate = async () => {
    await api.post("/timetable/generate", {
      subjectIds: subjects.map(x => x.id),
      facultyIds: faculty.map(x => x.id),
      classroomIds: classrooms.map(x => x.id)
    });

    loadAll();
  };

  const deleteItem = async (id) => {
    await api.delete(`/timetable/${id}`);
    loadAll();
  };

  return (
    <div style={{ padding: 20 }}>

      <h1>Dashboard</h1>

      <button onClick={generate}>
        Generate Timetable
      </button>

      <h3>Timetable</h3>

      <table border="1">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Faculty</th>
            <th>Classroom</th>
            <th>Day</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {timetable.map(t => (
            <tr key={t.id}>
              <td>{t.subject?.name}</td>
              <td>{t.faculty?.name}</td>
              <td>{t.classroom?.roomNumber}</td>
              <td>{t.day}</td>
              <td>{t.time}</td>
              <td>
                <button onClick={() => deleteItem(t.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default Dashboard;