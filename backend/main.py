from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend ON da thalaiva!"}

@app.get("/api/health")
def health():
    return {"status": "ok", "message": "Backend connect aayiduchu da!"}

@app.get("/api/protected")
def protected():
    return {"message": "Protected route work aaguthu da!"}

@app.get("/api/v1/task-1-1-2-3")
def task_1_1_2_3():
    return {
        "status": "completed",
        "message": "Backend sub-task 1.1.2.3 endpoint successfully created!"
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "project": "Cognitive Workspace"
    }