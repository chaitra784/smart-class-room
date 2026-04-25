import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // ✅ basic validation
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      const res = await api.post("/auth/login", {
        username: username,
        password: password,
      });

      console.log("Login Response:", res.data);

      // ✅ store user in localStorage
      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Login Successful");

      // ✅ redirect to dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      alert("Invalid username or password");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>Login</button>

      <br /><br />

      {/* ✅ Go to Register page */}
      <button onClick={() => navigate("/register")}>
        Go to Register
      </button>
    </div>
  );
}

export default Login;