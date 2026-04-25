import React, { useEffect, useState } from "react";
import api from "../services/api";

function Approval() {

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

  // APPROVE
  const approve = async (item) => {
    try {
      await api.put(`/timetable/${item.id}`, {
        ...item,
        status: "APPROVED"
      });

      loadTimetable();
    } catch (err) {
      console.log(err);
    }
  };

  // REJECT
  const reject = async (item) => {
    try {
      await api.put(`/timetable/${item.id}`, {
        ...item,
        status: "REJECTED"
      });

      loadTimetable();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>📋 Approval Panel</h1>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Subject</th>
            <th>Faculty</th>
            <th>Classroom</th>
            <th>Day</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {timetable.map((t) => (
            <tr key={t.id}>

              <td>{t.subject?.name}</td>
              <td>{t.faculty?.name}</td>
              <td>{t.classroom?.roomNumber}</td>
              <td>{t.day}</td>
              <td>{t.time}</td>

              <td>
                <b>{t.status || "PENDING"}</b>
              </td>

              <td>
                <button onClick={() => approve(t)} style={{ marginRight: "5px" }}>
                  ✅ Approve
                </button>

                <button onClick={() => reject(t)}>
                  ❌ Reject
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default Approval;