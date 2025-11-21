def task_helper(task) -> dict:
    return {
        "id": str(task["_id"]),
        "title": task["title"],
        "description": task.get("description"),
        "tags": task.get("tags", []),
        "completed": task.get("completed", False),
        "status": task.get("status", "todo"),
        "user_id": str(task["user_id"]),
    }
