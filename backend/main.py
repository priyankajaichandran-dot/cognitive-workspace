from fastapi import FastAPI

app = FastAPI(title="Cognitive Workspace")


@app.get("/")
def health_check():
    return {
        "status": "healthy",
        "project": "Cognitive Workspace"
    }
    @app.get("/api/v1/task-1-1-2-3")
def task_1_1_2_3():
    return {
        "status": "completed",
        "message": "Backend sub-task 1.1.2.3 endpoint successfully created!"
    }