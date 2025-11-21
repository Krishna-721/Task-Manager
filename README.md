# Prime Trade AI Task Manager Web App

This project is the official submission for the Prime Trade AI Frontend Developer Internship Assignment. It features a full-stack Task Manager web application with user authentication, profile management, and a Kanban-style task dashboard.

## Tech Stack

### Frontend

* Next.js 14+ (App Router)
* TypeScript
* Tailwind CSS
* hello-pangea/dnd (Drag-and-Drop)
* Fully responsive custom Sky-themed UI

### Backend

* FastAPI (Python)
* MongoDB Atlas
* JWT authentication
* bcrypt password hashing
* Modular API architecture

## Features Implemented

### Authentication & Security

* User Registration
* User Login
* Logout functionality
* JWT-secured protected routes
* Redirect on expired or invalid tokens
* Password hashing using bcrypt

### Task Dashboard (Kanban Board)

* Three columns: To Do, In Progress, Done
* Drag-and-drop functionality
* Automatic status update when moved
* Sticky note card UI
* Persistent description and status

### Task Operations (CRUD)

* Create tasks
* Update tasks (title, description, status)
* Move tasks between columns
* Delete tasks

### Profile Page

* View current profile details
* Update name, email, bio
* Circular avatar placeholder
* Cloud-themed UI

## Project Structure

```
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
```

## Local Setup and Running

### Prerequisites

* Node.js v18+ and npm
* Python 3.9+ and pip
* MongoDB Atlas connection string

### Running the Backend (FastAPI)

1. Install dependencies:

```
cd backend
pip install -r requirements.txt
```

2. Add `.env` file:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_ALGORITHM=HS256
```

3. Start FastAPI server:

```
uvicorn app.main:app --reload
```

Backend runs at: [http://localhost:8000](http://localhost:8000)

### Running the Frontend (Next.js)

1. Install dependencies:

```
cd frontend
npm install
```

2. Add `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

3. Start the server:

```
npm run dev
```

Frontend runs at: [http://localhost:3000](http://localhost:3000)

## API Documentation

### Authentication Endpoints

| Endpoint       | Method | Description                 |
| -------------- | ------ | --------------------------- |
| /auth/register | POST   | Register a new user         |
| /auth/login    | POST   | Login and receive JWT token |

### Profile Endpoints (Protected)

| Endpoint        | Method | Description                |
| --------------- | ------ | -------------------------- |
| /profile/me     | GET    | Fetch current user profile |
| /profile/update | PUT    | Update profile details     |

### Tasks Endpoints (Protected)

| Endpoint         | Method | Description         |
| ---------------- | ------ | ------------------- |
| /tasks           | POST   | Create task         |
| /tasks           | GET    | Retrieve all tasks  |
| /tasks/{task_id} | PUT    | Update a task by ID |
| /tasks/{task_id} | DELETE | Delete a task by ID |

## Production Scaling Notes

### Backend

* Auto-scaling on Render/Railway
* Restrict CORS to production domain
* Rate limiting on authentication endpoints
* Deploy on HTTPS
* MongoDB Atlas with cluster upgrades, indexing, IP allowlist

### Security

* Strong JWT secret
* Short token expiry and refresh rotation
* Pydantic validation on all requests

### Frontend

* Global CDN caching (Vercel)
* Edge Middleware for authentication redirects
* Error boundaries and strict TypeScript checks

---
