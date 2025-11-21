def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "password": user.get("password"),
        "bio": user.get("bio", ""),
    }
