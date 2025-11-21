// src/lib/api.ts

// Base backend URL
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// Automatically attach JWT if available
function authHeaders(): Record<string, string> {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
  }
  return {};
}

export async function apiRequest(
  path: string,
  options: {
    method?: string;
    body?: any;
    headers?: Record<string, string>;
  } = {}
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...authHeaders(),
    ...(options.headers || {}),
  };

  const res = await fetch(`${API_BASE}${path}`, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  let data: any = null;

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  }

  if (!res.ok) {
    throw new Error((data && data.detail) || "API Error");
  }

  return data;
}


export async function registerUser(payload: {
  name: string;
  email: string;
  password: string;
}) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: payload,
  });
}

export async function loginUser(payload: {
  email: string;
  password: string;
}) {
  const res = await apiRequest("/auth/login", {
    method: "POST",
    body: payload,
  });

  if (res.access_token) {
    localStorage.setItem("token", res.access_token);
  }

  return res;
}

export function logoutUser() {
  localStorage.removeItem("token");
}

// ========================
// PROFILE
// ========================

export async function getProfile() {
  return apiRequest("/profile/me");
}

export async function updateProfile(payload: {
  name?: string;
  email?: string;
  password?: string;
}) {
  return apiRequest("/profile/update", {
    method: "PUT",
    body: payload,
  });
}

// ========================
// TASKS CRUD
// ========================

export async function getTasks() {
  return apiRequest("/tasks");
}

export async function createTask(payload: {
  title: string;
  description?: string;
  tags?: string[];
}) {
  return apiRequest("/tasks", {
    method: "POST",
    body: payload,
  });
}

export async function updateTask(
  id: string,
  payload: {
    title?: string;
    description?: string;
    completed?: boolean;
    tags?: string[];
  }
) {
  return apiRequest(`/tasks/${id}`, {
    method: "PUT",
    body: payload,
  });
}

export async function deleteTask(id: string) {
  return apiRequest(`/tasks/${id}`, {
    method: "DELETE",
  });
}
