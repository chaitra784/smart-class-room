import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={styles.sidebar}>

      <h2 style={styles.title}>📚 Timetable</h2>

      <Link style={styles.link} to="/dashboard">🏠 Dashboard</Link>
      <Link style={styles.link} to="/subjects">📘 Subjects</Link>
      <Link style={styles.link} to="/faculty">👨‍🏫 Faculty</Link>
      <Link style={styles.link} to="/classroom">🏫 Classroom</Link>
      <Link style={styles.link} to="/generate">⚙️ Generate</Link>
      <Link style={styles.link} to="/timetable">📅 View Timetable</Link>

      <button onClick={logout} style={styles.logout}>
        🚪 Logout
      </button>

    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    height: "100vh",
    backgroundColor: "#1e293b",
    color: "white",
    padding: "20px",
    position: "fixed"
  },

  title: {
    marginBottom: "30px"
  },

  link: {
    display: "block",
    color: "white",
    textDecoration: "none",
    margin: "15px 0",
    padding: "8px",
    borderRadius: "5px"
  },

  logout: {
    marginTop: "30px",
    padding: "10px",
    width: "100%",
    backgroundColor: "red",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};

export default Sidebar;