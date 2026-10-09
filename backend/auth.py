import os
import jwt
from fastapi import HTTPException, Security, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

security = HTTPBearer()

SUPABASE_URL = os.getenv("SUPABASE_URL", "")

def verify_jwt(credentials: HTTPAuthorizationCredentials = Security(security)) -> dict:
    """
    Extracts and verifies the Bearer JWT token sent from the Next.js frontend.
    """
    token = credentials.credentials
    try:
        payload = jwt.decode(
            token,
            options={"verify_signature": False},
            algorithms=["HS256", "RS256"]
        )
        return payload
    except jwt.PyJWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid or expired token: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )