import React, { useEffect, useState } from "react";
import api from "../services/api";

function ViewTimetable() {

  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    loadTimetable();
  }, []);

  const loadTimetable = async () => {
    try {
      const res = await api.get("/timetable");
      setTimetable(res.data);
    } catch (err) {
      console.log("Error loading timetable", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📅 View Timetable</h2>

      <table border="1" cellPadding="10" width="100%">

        <thead>
          <tr>
            <th>Subject</th>
            <th>Faculty</th>
            <th>Classroom</th>
            <th>Day</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {timetable.length > 0 ? (
            timetable.map((t) => (
              <tr key={t.id}>
                <td>{t.subject?.name}</td>
                <td>{t.faculty?.name}</td>
                <td>{t.classroom?.roomNumber}</td>
                <td>{t.day}</td>
                <td>{t.time}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No Timetable Found
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
}

export default ViewTimetable;