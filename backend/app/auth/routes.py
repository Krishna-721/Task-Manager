from fastapi import APIRouter, HTTPException
from bson import ObjectId

from app.schemas.user import UserCreate, UserLogin
from app.db.connection import user_collection
from app.auth.hashing import hash_password, verify_password
from app.auth.jwt_handler import create_access_token
from app.models.user import user_helper

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register")
async def register(user: UserCreate):
    existing = await user_collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")

    #Hash password and insert user
    user_dict = user.dict()
    user_dict["password"] = hash_password(user.password)

    result = await user_collection.insert_one(user_dict)
    created_user = await user_collection.find_one({"_id": result.inserted_id})

    return {
        "message": "User registered successfully",
        "user": user_helper(created_user),
    }


@router.post("/login")
async def login(user: UserLogin):
    db_user = await user_collection.find_one({"email": user.email})
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    #creating a token
    token = create_access_token(
        {"sub": str(db_user["_id"]), "email": db_user["email"]}
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user_helper(db_user),
    }
