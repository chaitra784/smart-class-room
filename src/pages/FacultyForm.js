import React, { useState, useEffect } from "react";
import api from "../services/api";

function FacultyForm({ fetchFaculty }) {

  const [faculty, setFaculty] = useState([]);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [editId, setEditId] = useState(null);

  // 🔥 LOAD FACULTY
  const loadFaculty = async () => {
    const res = await api.get("/faculty");
    setFaculty(res.data);
  };

  useEffect(() => {
    loadFaculty();
  }, []);

  // 🔥 ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await api.put(`/faculty/${editId}`, {
        name,
        department
      });
    } else {
      await api.post("/faculty", {
        name,
        department
      });
    }

    setName("");
    setDepartment("");
    setEditId(null);

    loadFaculty();
    fetchFaculty();
  };

  // 🔥 EDIT
  const handleEdit = (f) => {
    setEditId(f.id);
    setName(f.name);
    setDepartment(f.department);
  };

  // 🔥 DELETE
  const handleDelete = async (id) => {
    await api.delete(`/faculty/${id}`);
    loadFaculty();
    fetchFaculty();
  };

  return (
    <div>
      <h3>{editId ? "Edit Faculty" : "Add Faculty"}</h3>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Faculty Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />

        <button type="submit">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <br />

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {faculty.map((f) => (
            <tr key={f.id}>
              <td>{f.name}</td>
              <td>{f.department}</td>
              <td>
                <button onClick={() => handleEdit(f)}>Edit</button>
                <button onClick={() => handleDelete(f.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FacultyForm;