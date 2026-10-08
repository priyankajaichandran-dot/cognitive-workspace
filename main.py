from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from auth import verify_jwt

app = FastAPI(title="Cognitive Workspace API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "Backend operational"}

@app.get("/api/protected")
def protected_route(user: dict = Depends(verify_jwt)):
    return {
        "message": "Access granted to protected endpoint!",
        "user_id": user.get("sub"),
        "email": user.get("email")
    }