"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<{id:number, text:string, time:string}[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("cognitive-notes-pro");
    if (saved) setNotes(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem("cognitive-notes-pro", JSON.stringify(notes));
  }, [notes]);

  const saveNote = () => {
    if (!text.trim()) return;
    const newNote = { id: Date.now(), text, time: new Date().toLocaleString() };
    setNotes([newNote,...notes]);
    setText("");
  };

  const filtered = notes.filter(n => n.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <main style={{ minHeight: '100vh', background: 'radial-gradient(circle at top, #1a1a2e, #000)', color: 'white', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', margin: '40px 0' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '900' }}>🧠 Cognitive Workspace</h1>
          <p style={{ color: '#888', marginTop: '10px' }}>Your AI Second Brain • {notes.length} thoughts captured</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '20px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==='Enter' && saveNote()} placeholder="✨ Oru pudhu idea... " style={{ flex: 1, padding: '14px', borderRadius: '10px', border: 'none', background: '#111', color: 'white', fontSize: '16px' }} />
            <button onClick={saveNote} style={{ padding: '14px 28px', background: 'white', color: 'black', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Save</button>
          </div>
        </div>

        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search pannu..." style={{ width: '100%', marginTop: '20px', padding: '12px', borderRadius: '10px', border: '1px solid #222', background: '#0a0a0a', color: 'white' }} />

        <div style={{ marginTop: '25px', display: 'grid', gap: '12px' }}>
          {filtered.map(n=>(
            <div key={n.id} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '16px' }}>{n.text}</p>
                <p style={{ fontSize: '11px', color: '#666', marginTop: '6px' }}>{n.time}</p>
              </div>
              <button onClick={()=>setNotes(notes.filter(x=>x.id!==n.id))} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer' }}>✕</button>
            </div>
          ))}
          {filtered.length===0 && <p style={{ textAlign: 'center', color: '#444', marginTop: '40px' }}>No ideas yet. Mela oru idea potu paaru da!</p>}
        </div>
      </div>
    </main>
  );
}