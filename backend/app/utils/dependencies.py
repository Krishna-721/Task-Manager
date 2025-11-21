from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer
from app.auth.jwt_handler import verify_token

security = HTTPBearer()

async def get_current_user(token: object = Depends(security)):
    """
    Extracts and verifies JWT token from Authorization header.
    Returns payload if valid.
    else Raises 401 if invalid or missing.
    """
    payload = verify_token(token.credentials)

    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    return payload  
