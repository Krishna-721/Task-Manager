from fastapi import APIRouter, Depends, HTTPException, Query
from bson import ObjectId
from typing import List, Optional
from app.db.connection import task_collection
from app.schemas.task import TaskCreate, TaskOut, TaskUpdate
from app.models.task import task_helper
from app.utils.dependencies import get_current_user

router = APIRouter(prefix="/tasks", tags=["Tasks"])


@router.post("/", response_model=TaskOut)
async def create_task(task: TaskCreate, user=Depends(get_current_user)):
    """
    Create a new task
    """
    new_task = task.dict()
    new_task["user_id"] = ObjectId(user["sub"])

    result = await task_collection.insert_one(new_task)
    created = await task_collection.find_one({"_id": result.inserted_id})

    return task_helper(created)


@router.get("/", response_model=List[TaskOut])
async def get_tasks(
    q: Optional[str] = Query(None, description="Search text"),
    completed: Optional[bool] = Query(None, description="Filter by completed status"),
    user=Depends(get_current_user)
):
    """
    List all tasks.
    """
    query = {"user_id": ObjectId(user["sub"])}

    if completed is not None:
        query["completed"] = completed

    if q:
        query["$or"] = [
            {"title": {"$regex": q, "$options": "i"}},
            {"description": {"$regex": q, "$options": "i"}},
        ]

    tasks = await task_collection.find(query).to_list(200)
    return [task_helper(t) for t in tasks]


@router.get("/{task_id}", response_model=TaskOut)
async def get_task(task_id: str, user=Depends(get_current_user)):
    """
    Get a task by ID.
    """
    task = await task_collection.find_one({
        "_id": ObjectId(task_id),
        "user_id": ObjectId(user["sub"])
    })

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    return task_helper(task)


@router.put("/{task_id}", response_model=TaskOut)
async def update_task(task_id: str, update_data: TaskUpdate, user=Depends(get_current_user)):
    existing = await task_collection.find_one({
        "_id": ObjectId(task_id),
        "user_id": ObjectId(user["sub"])
    })

    if not existing:
        raise HTTPException(status_code=404, detail="Task not found")

    data = {k: v for k, v in update_data.dict().items() if v is not None}

    await task_collection.update_one(
        {"_id": ObjectId(task_id)},
        {"$set": data}
    )

    updated = await task_collection.find_one({"_id": ObjectId(task_id)})
    return task_helper(updated)



@router.delete("/{task_id}")
async def delete_task(task_id: str, user=Depends(get_current_user)):
    """
    Delete a task by ID.
    """
    result = await task_collection.delete_one({
        "_id": ObjectId(task_id),
        "user_id": ObjectId(user["sub"])
    })

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")

    return {"message": "Task deleted successfully"}
