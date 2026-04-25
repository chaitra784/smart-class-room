import React, { useState, useEffect } from "react";
import api from "../services/api";

function ClassroomForm({ fetchClassrooms }) {

  const [classrooms, setClassrooms] = useState([]);
  const [roomNumber, setRoomNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [editId, setEditId] = useState(null);

  // 🔥 LOAD CLASSROOMS
  const loadClassrooms = async () => {
    try {
      const res = await api.get("/classroom");
      setClassrooms(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadClassrooms();
  }, []);

  // 🔥 ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await api.put(`/classroom/${editId}`, {
          roomNumber,
          capacity
        });
      } else {
        await api.post("/classroom", {
          roomNumber,
          capacity
        });
      }

      setRoomNumber("");
      setCapacity("");
      setEditId(null);

      loadClassrooms();
      fetchClassrooms(); // update dropdown in Dashboard

    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 EDIT
  const handleEdit = (c) => {
    setEditId(c.id);
    setRoomNumber(c.roomNumber);
    setCapacity(c.capacity);
  };

  // 🔥 DELETE
  const handleDelete = async (id) => {
    try {
      await api.delete(`/classroom/${id}`);
      loadClassrooms();
      fetchClassrooms();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>{editId ? "Edit Classroom" : "Add Classroom"}</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Room Number"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          required
        />

        <button type="submit">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <br />

      {/* 🔥 TABLE */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Room</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {classrooms.map((c) => (
            <tr key={c.id}>
              <td>{c.roomNumber}</td>
              <td>{c.capacity}</td>
              <td>
                <button onClick={() => handleEdit(c)}>Edit</button>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClassroomForm;