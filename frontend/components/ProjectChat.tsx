"use client"
import { useState } from "react"

export default function ProjectChat() {
  const [input, setInput] = useState("")
  const [list, setList] = useState<{role:string, text:string}[]>([])

  async function send() {
    if(!input.trim()) return
    const q = input
    setInput("")
    setList(prev => [...prev, {role:"Nee", text: q}, {role:"AI", text: "typing..."}])

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q })
      })
      const data = await res.json()
      
      // Console la paarkalam
      console.log("FINAL DATA:", data)
      
      // Edhu vanthalum kaamikuthu
      const finalReply = data.reply || data.text || JSON.stringify(data)

      setList(prev => {
        const newList = [...prev]
        newList[newList.length - 1] = {role: "AI", text: finalReply}
        return newList
      })

    } catch(e:any){
      setList(prev => {
        const newList = [...prev]
        newList[newList.length - 1] = {role: "AI", text: "Error: "+e.message}
        return newList
      })
    }
  }

  return (
    <div style={{padding:'10px'}}>
      <h2>💬 Project AI Chat</h2>
      <div style={{background:'#000', color:'#fff', height:'300px', overflow:'auto', padding:'10px', borderRadius:'10px'}}>
        {list.map((c,i) => (
          <div key={i} style={{marginBottom:'10px'}}>
            <b style={{color: c.role==='Nee' ? '#0ff' : '#0f0'}}>{c.role}: </b>
            <span>{c.text}</span>
          </div>
        ))}
      </div>
      <div style={{display:'flex', gap:'10px', marginTop:'10px'}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Kelu da thalaiva..." style={{flex:1, padding:'10px'}} />
        <button onClick={send} style={{padding:'10px 20px', background:'black', color:'white', borderRadius:'5px'}}>Send</button>
      </div>
    </div>
  )
}