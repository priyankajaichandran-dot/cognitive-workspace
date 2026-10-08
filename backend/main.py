from fastapi import FastAPI

app = FastAPI(title="Cognitive Workspace")


@app.get("/")
def health_check():
    return {
        "status": "healthy",
        "project": "Cognitive Workspace"
    }