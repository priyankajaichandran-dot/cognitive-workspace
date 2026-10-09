"use client"
import { useState, useEffect } from "react"
import { supabase } from "../lib/supabaseClient"

export default function Home() {
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
  }, [])

  async function handleHealthCheck() {
    setLoading(true)
    try {
      const res = await fetch("http://127.0.0.1:8000/api/health")
      const data = await res.json()
      setResponse(`✅ ${data.message} - Status: ${data.status}`)
      alert(`Backend sonnuchu da: ${data.message}`)
    } catch (error) {
      setResponse("❌ Backend connect aagala da! Backend ON la irukka nu paaru da!")
      console.error(error)
    }
    setLoading(false)
  }

  async function handleLogin() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      alert("Login fail da: " + error.message)
    } else {
      setUser(data.user)
      alert("Login success da thalaiva! 🔥")
    }
  }

  async function handleProtected() {
    setLoading(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setResponse("❌ Login pannala da thalaiva! Muthalla login pannu da!")
        alert("Muthalla login pannu da!")
        setLoading(false)
        return
      }

      const res = await fetch("http://127.0.0.1:8000/api/protected", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      })
      const data = await res.json()
      setResponse(JSON.stringify(data, null, 2))
      alert(JSON.stringify(data))
    } catch (error) {
      setResponse("❌ Protected route ku auth venum da!")
      console.error(error)
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Cognitive Workspace Da 🧠</h1>
      <p>Frontend + Backend Connected Da!</p>

      {!user ? (
        <div style={{ margin: '20px 0', padding: '15px', border: '1px solid #ccc' }}>
          <h3>Login Pannu Da:</h3>
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{margin:'5px', padding:'8px'}} />
          <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{margin:'5px', padding:'8px'}} />
          <button onClick={handleLogin} style={{padding:'10px', background:'purple', color:'white'}}>Login Da</button>
          <p style={{fontSize:'12px'}}>Supabase la user create panniya da? Auth -&gt; Users la paaru da</p>
        </div>
      ) : (
        <p>✅ Logged in da: {user.email}</p>
      )}

      <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
        <button onClick={handleHealthCheck} style={{padding:'10px', background:'blue', color:'white', borderRadius:'5px'}}>Backend ah Koopu Da</button>
        <button onClick={handleProtected} style={{padding:'10px', background:'green', color:'white', borderRadius:'5px'}}>Protected Route Test Da</button>
      </div>

      <pre style={{ background: '#eef', padding: '15px' }}>Response: {response}</pre>
    </div>
  )
}