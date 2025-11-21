Prime Trade AI Internship Assignment – Task Manager Web App

This project is built as part of the Prime Trade AI Frontend Developer Internship assignment.
It includes a full-featured Task Manager web application with user authentication, profile management, and a Kanban-style task dashboard.

1. Tech Stack Used
Frontend

Next.js 16 (App Router)

TypeScript

TailwindCSS

Drag-and-drop board using hello-pangea/dnd

Fully responsive UI

Custom sky theme

Backend

FastAPI (Python)

MongoDB (Atlas)

JWT-based authentication

bcrypt password hashing

Modular, scalable API structure

2. Features Implemented
Authentication

User registration

User login

Logout functionality

JWT-secured routes

Automatic redirect on invalid/expired tokens

Dashboard

Kanban board with 3 columns:

To Do

In Progress

Done

Drag and drop support

Automatic status update

Sticky note card design

Ghibli-inspired colors and gradients

Task Operations

Create tasks

Move tasks between columns

View tasks in their respective lanes

Supports description and status persistence

Profile Page

View profile details

Update name, email, and bio

Circular avatar placeholder

Styled with soft cloud theme

Backend API

Register user

Login user

Fetch profile

Update profile

CRUD for tasks

JWT validation middleware

Password hashing using bcrypt

3. Project Structure
Prime Trade AI/
│── backend/
│   ├── app/
│   │   ├── auth/
│   │   ├── db/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── utils/
│   │   └── main.py
│   ├── .env
│   └── requirements.txt
│
│── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── styles/
│   ├── package.json
│   └── next.config.js
│
└── README.md

4. Running the Backend
Step 1: Install dependencies
cd backend
pip install -r requirements.txt

Step 2: Add .env
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JWT_ALGORITHM=HS256

Step 3: Start FastAPI server
uvicorn app.main:app --reload

Backend runs at:

http://localhost:8000

5. Running the Frontend
Step 1: Install dependencies

cd frontend

npm install

Step 2: Add .env.local

NEXT_PUBLIC_API_URL=http://localhost:8000

Step 3: Start Next.js server

npm run dev

Frontend runs at:
http://localhost:3000

6. Environment Variables
Backend .env
MONGO_URI=
JWT_SECRET=
JWT_ALGORITHM=HS256

Frontend .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000

7. API Documentation
1. Overview
This backend provides secure JWT-based authentication, User Profile, and Task CRUD APIs.
Data is stored in MongoDB, and all requests require proper validation.

2. Authentication
2.1 Register User

POST /auth/register
Request Body

{
  "name": "John Doe",
  
  "email": "john@example.com",
  
  "password": "mypassword"
}

Success Response
{
  "message": "User registered successfully",
  
  "user": {
    "id": "678abc123...",
    "name": "John Doe",
    "email": "john@example.com"
  
  }
}

Errors
400 Email already exists
422 Validation error

2.2 Login
POST /auth/login

Request Body

{
  "email": "john@example.com",
  "password": "mypassword"
}

Success Response

{
  "access_token": "jwt_token_here",

  "token_type": "bearer",
  
  "user": {
    "id": "678abc123...",
    "name": "John Doe",
    "email": "john@example.com"
  
  }
}

Errors
400 Invalid credentials

3. User Profile

3.1 Get Profile

GET /profile/me

Headers

Authorization: Bearer <token>

Success Response

{
  "id": "678abc123",
  "name": "John Doe",
  "email": "john@example.com",
  "bio": "Focused and disciplined."
}

3.2 Update Profile

PUT /profile/update

Headers

Authorization: Bearer <token>

Request Body (optional)
{
  "name": "New Name",
  "email": "newmail@gmail.com",
  "password": "newpass123",
  "bio": "New bio text"
}

Success Response

{
  "message": "Profile updated successfully"
}

4. Tasks API

4.1 Create Task

POST /tasks

Headers

Authorization: Bearer <token>

Request Body

{
  "title": "Finish project",
  "description": "Complete backend & frontend",
  "tags": ["work],
  "completed": false,
  "status": "todo"
}

Success Response

{
  "id": "6790ab123",
  "title": "Finish project",
  "description": "Complete backend & frontend",
  "completed": false,
  "tags": [],
  "status": "todo",
  "user_id": "678abc123"
}

4.2 Get All Tasks

GET /tasks

Headers

Authorization: Bearer <token>

Success Response

[
  {
    "id": "6790ab123",
    "title": "Finish project",
    "description": "Complete backend & frontend",
    "completed": false,
    "status": "todo"
  }
]

4.3 Update Task

PUT /tasks/{task_id}

Headers

Authorization: Bearer <token>

Request Body

{
  "title": "Updated title",
  "description": "Updated desc",
  "completed": true,
  "status": "done"
}

Success Response

{
  "id": "6790ab123",
  "title": "Updated title",
  "description": "Updated desc",
  "completed": true,
  "status": "done",
  "user_id": "678abc123"
}

4.4 Delete Task

DELETE /tasks/{task_id}

Headers

Authorization: Bearer <token>

Success Response
{
  "message": "Task deleted successfully"
}

5. Authentication Notes
JWTs must be included in Authorization Header

Tokens expire (based on your JWT config)

Passwords are hashed using bcrypt

All protected routes require get_current_user

6. Error Response Format

Example:
{
  "detail": "Invalid credentials"
}

Validation example:

{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "value is not a valid email",
      "type": "value_error.email"
    }
  ]
}

8. Production Scaling Notes

Frontend (Vercel)

Global CDN caching

Image optimization

Edge Middleware for auth redirects

Production API environment variables

Error boundaries + TypeScript checks

Backend (Render / Railway / Docker)

Auto-scaling instances

CORS restricted to frontend domain

Async worker processes

Centralized logging + monitoring

Rate limiting for auth routes

Database (MongoDB Atlas)

Upgrade to M10+ cluster

Indexing for faster queries

IP allowlist

Daily backups + snapshots

Security Enhancements

HTTPS enforced

Strong JWT secret

Short expiry + refresh token rotation

Pydantic validation on every request

Codebase Scalability

Modular folder structure

Easy to add new collections (notes, projects, etc.)

Reusable UI components

API and service layer separation
