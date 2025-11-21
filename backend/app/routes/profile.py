from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId
from app.db.connection import user_collection
from app.schemas.user import UserOut, UserUpdate
from app.models.user import user_helper
from app.utils.dependencies import get_current_user
from app.auth.hashing import hash_password

router = APIRouter(prefix="/profile", tags=["Profile"])


@router.get("/me", response_model=UserOut)
async def get_my_profile(user=Depends(get_current_user)):
    user_doc = await user_collection.find_one({"_id": ObjectId(user["sub"])})
    if not user_doc:
        raise HTTPException(status_code=404, detail="User not found")
    return user_helper(user_doc)


@router.put("/update", response_model=UserOut)
async def update_my_profile(payload: UserUpdate, user=Depends(get_current_user)):
    update_data = {k: v for k, v in payload.dict().items() if v is not None}

    # Password update handling
    if "password" in update_data:
        update_data["password"] = hash_password(update_data["password"])

    result = await user_collection.update_one(
        {"_id": ObjectId(user["sub"])},
        {"$set": update_data}
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=400, detail="No changes made")

    updated_user = await user_collection.find_one({"_id": ObjectId(user["sub"])})

    return user_helper(updated_user)
