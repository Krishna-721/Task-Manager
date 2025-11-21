from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.auth.routes import router as auth_router
from app.routes.tasks import router as task_router

from app.routes.profile import router as profile_router 


app = FastAPI(
    title="Task Master (SkyBoard) Web App Backend",
    description="FastAPI + MongoDB Atlas with JWT Authentication",
)

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(task_router)
app.include_router(profile_router)

@app.get("/")
def root():
    return {"message": "Backend running successfully!"}