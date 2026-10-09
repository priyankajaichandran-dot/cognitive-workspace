"use client"
import { useState } from "react"

const API_URL = "http://127.0.0.1:8000"

export default function Home() {
  const [token, setToken] = useState("")
  const [loggedEmail, setLoggedEmail] = useState("test@test.com")
  const [response, setResponse] = useState("")

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test@test.com", password: "123456" })
      })
      const data = await res.json()
      setToken(data.token)
      localStorage.setItem("token", data.token)
      setResponse(JSON.stringify(data))
    } catch (e) {
      setResponse("Login fail: " + String(e))
    }
  }

  const callBackend = async () => {
    const res = await fetch(`${API_URL}/api/health`)
    const data = await res.json()
    setResponse(JSON.stringify(data))
  }

  const callProtected = async () => {
    const savedToken = localStorage.getItem("token") || token || "thalaiva_token_123"
    const res = await fetch(`${API_URL}/api/protected`, {
      headers: { "Authorization": `Bearer ${savedToken}` }
    })
    const data = await res.json()
    setResponse(JSON.stringify(data))
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cognitive Workspace Da 🧠</h2>
      <p>✅ Logged in da: {loggedEmail}</p>
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <button onClick={callBackend} style={{ padding: "10px", background: "#0d6efd", color: "white", border: "none", borderRadius: "5px" }}>Backend ah Koopu Da</button>
        <button onClick={callProtected} style={{ padding: "10px", background: "#000", color: "white", border: "none", borderRadius: "5px" }}>Protected Route Test Da</button>
        <button onClick={handleLogin} style={{ padding: "10px", background: "#333", color: "white", border: "none", borderRadius: "5px" }}>Login Pannu Da</button>
      </div>
      <div style={{ marginTop: "20px", background: "#dbeafe", padding: "10px" }}>
        Response: {response}
      </div>
    </div>
  )
}