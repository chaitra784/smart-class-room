import React, { useState, useEffect } from "react";
import api from "../services/api";

function SubjectForm({ fetchSubjects }) {

  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [editId, setEditId] = useState(null);

  // 🔥 LOAD SUBJECTS
  const loadSubjects = async () => {
    const res = await api.get("/subjects");
    setSubjects(res.data);
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  // 🔥 ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await api.put(`/subjects/${editId}`, { name, code });
    } else {
      await api.post("/subjects", { name, code });
    }

    setName("");
    setCode("");
    setEditId(null);

    loadSubjects();
    fetchSubjects();
  };

  // 🔥 EDIT
  const handleEdit = (s) => {
    setEditId(s.id);
    setName(s.name);
    setCode(s.code);
  };

  // 🔥 DELETE
  const handleDelete = async (id) => {
    await api.delete(`/subjects/${id}`);
    loadSubjects();
    fetchSubjects();
  };

  return (
    <div>
      <h3>{editId ? "Edit Subject" : "Add Subject"}</h3>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Subject Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          placeholder="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
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
            <th>Code</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {subjects.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.code}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Edit</button>
                <button onClick={() => handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SubjectForm;