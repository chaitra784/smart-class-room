import React, { useEffect, useState } from "react";
import api from "../services/api";

function Timetable() {

  const [data, setData] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await api.get("/timetable");
    setData(res.data);
  };

  const generate = async () => {
    await api.post("/timetable/generate", {
      subjects: ["Math","Physics","CS"],
      faculties: ["Chaitra","John"],
      classrooms: ["C101","C102"]
    });

    load();
  };

  const deleteItem = async (id) => {
    await api.delete(`/timetable/${id}`);
    load();
  };

  return (
    <div style={{ padding: 20 }}>

      <h2>Timetable</h2>

      <button onClick={generate}>
        Generate Timetable
      </button>

      <table border="1" style={{ marginTop: 20 }}>
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
          {data.map((t) => (
            <tr key={t.id}>
              <td>{t.subject}</td>
              <td>{t.faculty}</td>
              <td>{t.classroom}</td>
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

export default Timetable;