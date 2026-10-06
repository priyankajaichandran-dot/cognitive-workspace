"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function Home() {
  const [projects, setProjects] = useState<any[]>([])
  const [title, setTitle] = useState("")
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [tasks, setTasks] = useState<any[]>([])
  const [taskTitle, setTaskTitle] = useState("")

  useEffect(() => { fetchProjects() }, [])

  async function fetchProjects() {
    const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false })
    if (data) setProjects(data)
  }

  async function addProject() {
    if (!title.trim()) return
    await supabase.from("projects").insert([{ title }])
    setTitle("")
    fetchProjects()
  }

  async function deleteProject(id: string) {
    if(!confirm("Delete project da? Tasks um poirum da!")) return
    await supabase.from("projects").delete().eq("id", id)
    setSelectedProject(null)
    setTasks([])
    fetchProjects()
  }

  async function fetchTasks(projectId: string) {
    const { data } = await supabase.from("tasks").select("*").eq("project_id", projectId).order("created_at", { ascending: false })
    if (data) setTasks(data)
  }

  function openProject(p: any) {
    setSelectedProject(p)
    fetchTasks(p.id)
  }

  async function addTask() {
    if (!taskTitle.trim() || !selectedProject) return
    await supabase.from("tasks").insert([{ title: taskTitle, project_id: selectedProject.id }])
    setTaskTitle("")
    fetchTasks(selectedProject.id)
  }

  async function toggleTask(id: string, is_done: boolean) {
    await supabase.from("tasks").update({ is_done: !is_done }).eq("id", id)
    fetchTasks(selectedProject.id)
  }

  async function deleteTask(id: string) {
    await supabase.from("tasks").delete().eq("id", id)
    fetchTasks(selectedProject.id)
  }

  const doneCount = tasks.filter(t => t.is_done).length
  const progress = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "white", fontFamily: "Inter, Arial", display: "flex" }}>
      <div style={{ width: "380px", background: "#111", borderRight: "1px solid #222", padding: "24px", height: "100vh", overflowY: "auto" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "800", marginBottom: "4px" }}>🧠 COGNITIVE</h1>
        <p style={{ color: "#666", fontSize: "12px", letterSpacing: "2px", marginBottom: "24px" }}>WORKSPACE</p>
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New project idea..." style={{ padding: "10px 12px", flex: 1, background: "#1a1a1a", border: "1px solid #333", color: "white", borderRadius: "8px" }} />
          <button onClick={addProject} style={{ background: "white", color: "black", padding: "10px 16px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>+</button>
        </div>
        <p style={{ fontSize: "11px", color: "#555", letterSpacing: "1px", marginBottom: "12px" }}>YOUR PROJECTS ({projects.length})</p>
        {projects.map(p => (
          <div key={p.id} onClick={() => openProject(p)} style={{ padding: "14px", border: selectedProject?.id === p.id ? "1px solid white" : "1px solid #222", background: selectedProject?.id === p.id ? "#1a1a1a" : "#151515", marginBottom: "10px", cursor: "pointer", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: "500" }}>{p.title}</span>
            <button onClick={(e) => { e.stopPropagation(); deleteProject(p.id) }} style={{ background: "transparent", color: "#555", border: "none", cursor: "pointer" }}>✕</button>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, padding: "32px", background: "#0a0a0a" }}>
        {selectedProject ? (
          <>
            <div style={{ marginBottom: "32px" }}>
              <h2 style={{ fontSize: "36px", fontWeight: "800", marginBottom: "8px" }}>{selectedProject.title}</h2>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <div style={{ width: "120px", height: "6px", background: "#222", borderRadius: "10px", overflow: "hidden" }}>
                  <div style={{ width: `${progress}%`, height: "100%", background: "white", transition: "0.3s" }}></div>
                </div>
                <span style={{ fontSize: "13px", color: "#888" }}>{doneCount}/{tasks.length} done - {progress}%</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
              <input value={taskTitle} onChange={e => setTaskTitle(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTask()} placeholder="What needs to be done?" style={{ padding: "14px", flex: 1, background: "#111", border: "1px solid #222", color: "white", borderRadius: "10px", fontSize: "15px" }} />
              <button onClick={addTask} style={{ background: "white", color: "black", padding: "0 24px", borderRadius: "10px", fontWeight: "700", cursor: "pointer" }}>Add Task</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {tasks.map(t => (
                <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: t.is_done ? "#111" : "#151515", border: "1px solid #222", borderRadius: "12px", opacity: t.is_done ? 0.6 : 1 }}>
                  <span onClick={() => toggleTask(t.id, t.is_done)} style={{ textDecoration: t.is_done ? "line-through" : "none", cursor: "pointer", display: "flex", gap: "10px", alignItems: "center" }}>
                    <span style={{ width: "22px", height: "22px", borderRadius: "6px", border: "1px solid #444", background: t.is_done ? "white" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: "black", fontSize: "12px" }}>{t.is_done ? "✓" : ""}</span>
                    {t.title}
                  </span>
                  <button onClick={() => deleteTask(t.id)} style={{ background: "#222", color: "#888", border: "none", padding: "6px 10px", borderRadius: "6px", cursor: "pointer" }}>Delete</button>
                </div>
              ))}
              {tasks.length === 0 && <p style={{ color: "#555", textAlign: "center", marginTop: "40px" }}>No tasks yet da. Add pannu thalaiva! 👇</p>}
            </div>
          </>
        ) : (
          <div style={{ height: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#444" }}>
            <div style={{ fontSize: "60px", marginBottom: "20px" }}>👈</div>
            <h2 style={{ fontSize: "20px", color: "#666" }}>Oru project ah select pannu da thalaiva</h2>
          </div>
        )}
      </div>
    </div>
  )
}