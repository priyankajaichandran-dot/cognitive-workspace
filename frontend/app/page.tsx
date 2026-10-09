"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [response, setResponse] = useState("");
  const [email, setEmail] = useState("test@test.com");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Backend URL - un Vercel URL ah inga potuko da
  const BACKEND_URL = "https://cognitive-workspace-vb1x.vercel.app"; 
  // Local ku: "http://localhost:8000"

  const callBackend = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/health`);
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponse("Error: Backend not connected");
    }
  };

  const testProtectedRoute = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/protected`);
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponse("Error: Protected route failed");
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
    setResponse(isLoggedIn ? "Logged out" : "Logged in as test@test.com");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Cognitive Workspace 🧠</h1>
      
      {isLoggedIn && (
        <p style={{ color: "green" }}>✅ Logged in as: {email}</p>
      )}

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button 
          onClick={callBackend}
          style={{ background: "#0070f3", color: "white", padding: "10px 15px", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          Call Backend
        </button>

        <button 
          onClick={testProtectedRoute}
          style={{ background: "black", color: "white", padding: "10px 15px", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          Test Protected Route
        </button>

        <button 
          onClick={handleLogin}
          style={{ background: "#333", color: "white", padding: "10px 15px", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>

      <div style={{ marginTop: "20px", background: "#e6f0ff", padding: "15px", borderRadius: "5px" }}>
        <strong>Response:</strong>
        <pre style={{ marginTop: "10px", whiteSpace: "pre-wrap" }}>{response}</pre>
      </div>
    </div>
  );
}