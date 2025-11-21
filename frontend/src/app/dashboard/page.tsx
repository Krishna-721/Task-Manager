"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getTasks,
  createTask,
  updateTask,
  getProfile,
  logoutUser,
  deleteTask,
} from "@/lib/api";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import TaskCard from "@/components/tasks/TaskCard";

export default function DashboardPage() {
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);

  // 🔵 EDIT MODAL STATE
  const [editingTask, setEditingTask] = useState<any | null>(null);
  const [editData, setEditData] = useState({ title: "", description: "" });

  // 🔍 Filters & Sorting
  const [search, setSearch] = useState("");
  const [filterColumn, setFilterColumn] = useState("all");
  const [filterCompletion, setFilterCompletion] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const columns = ["todo", "in_progress", "done"];

  // ------------------------------
  // LOAD USER + TASKS
  // ------------------------------
  useEffect(() => {
    async function load() {
      try {
        const user = await getProfile();
        const t = await getTasks();
        setProfile(user);
        setTasks(t);
      } catch (err) {
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // ------------------------------
  // DRAG & DROP
  // ------------------------------
  const onDragEnd = async (result: any) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    const updated = await updateTask(taskId, { status: newStatus } as any);

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? updated : t))
    );
  };

  // ------------------------------
  // CREATE TASK
  // ------------------------------
  const handleCreate = async () => {
    if (!newTask.title.trim()) return;

    const saved = await createTask(newTask);

    const updated = await updateTask(saved.id, {
      ...saved,
      status: "todo",
    } as any);

    setTasks((prev) => [updated, ...prev]);
    setNewTask({ title: "", description: "" });
  };

  // ------------------------------
  // TOGGLE DONE/UNDO
  // ------------------------------
  const handleToggle = async (task: any) => {
    const updated = await updateTask(task.id, {
      completed: !task.completed,
      title: task.title,
      description: task.description,
      status: task.status,
    } as any);

    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? updated : t))
    );
  };

  // ------------------------------
  // DELETE TASK
  // ------------------------------
  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // ------------------------------
  // OPEN EDIT MODAL
  // ------------------------------
  const openEditModal = (task: any) => {
    setEditingTask(task);
    setEditData({
      title: task.title,
      description: task.description || "",
    });
  };

  // ------------------------------
  // SAVE EDIT
  // ------------------------------
  const saveEdit = async () => {
    if (!editingTask) return;

    const updated = await updateTask(editingTask.id, {
      ...editingTask,
      title: editData.title,
      description: editData.description,
    } as any);

    setTasks((prev) =>
      prev.map((t) =>
        t.id === editingTask.id ? updated : t
      )
    );

    setEditingTask(null);
  };

  const handleLogout = () => {
    logoutUser();
    router.replace("/login");
  };

  // ------------------------------
  // PROCESS TASKS: search + filters + sort
  // ------------------------------
  const processedTasks = tasks
    .filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      (t.description || "").toLowerCase().includes(search.toLowerCase())
    )
    .filter((t) =>
      filterColumn === "all" ? true : t.status === filterColumn
    )
    .filter((t) =>
      filterCompletion === "all"
        ? true
        : filterCompletion === "completed"
        ? t.completed === true
        : t.completed === false
    )
    .sort((a, b) => {
  const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
  const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;

  if (sortOrder === "newest") return dateB - dateA;
  if (sortOrder === "oldest") return dateA - dateB;
  if (sortOrder === "az") return a.title.localeCompare(b.title);
  if (sortOrder === "za") return b.title.localeCompare(a.title);

  return 0;
});
  

  // ------------------------------
  // LOADING SCREEN
  // ------------------------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-300">
        <div className="animate-spin h-12 w-12 border-4 border-white border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // ------------------------------
  // UI
  // ------------------------------
  return (
    <div
      className="min-h-screen p-10 text-gray-900 relative overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, #7ecbff 0%, #a6dcff 40%, #dff3ff 100%)`,
      }}
    >
      {/* Clouds */}
      <div className="absolute top-10 left-10 w-64 h-32 bg-white/70 blur-3xl rounded-full"></div>
      <div className="absolute top-40 right-10 w-72 h-40 bg-white/60 blur-3xl rounded-full"></div>
      <div className="absolute bottom-32 left-20 w-80 h-48 bg-white/50 blur-[90px] rounded-full"></div>

      {/* Title */}
      <div className="text-center relative z-10">
        <h1 className="text-5xl font-bold tracking-tight text-white drop-shadow-lg">
          空へ — To the Sky
        </h1>
        <p className="text-white/90 text-xl mt-2 drop-shadow-md">
          One step at a time
        </p>
      </div>

      {/* Profile section */}
      <div className="relative z-10 flex justify-between max-w-5xl mx-auto mt-10">
        <h2 className="text-xl font-semibold text-white drop-shadow-lg">
          Welcome to SkyBoard, {profile?.name || profile?.email}
        </h2>

        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/profile")}
            className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-lg flex items-center justify-center hover:bg-white/40 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" stroke="white" fill="none" viewBox="0 0 24 24">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                d="M12 12c2.8 0 5-2.2 5-5s-2.2-5-5-5-5 2.2-5 5 2.2 5 5 5zm0 2c-4.4 0-8 2.4-8 6v1h16v-1c0-3.6-3.6-6-8-6z"
              />
            </svg>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/80 hover:bg-red-600 text-white rounded-xl shadow-lg transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Create Task */}
      <div className="relative z-10 max-w-5xl mx-auto mt-10 backdrop-blur-xl bg-white/40 border border-white/50 p-6 rounded-3xl shadow-2xl">
        <input
          className="w-full p-3 rounded-xl bg-white/50 text-gray-900 mb-3 shadow-inner"
          placeholder="Task title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />

        <textarea
          className="w-full p-3 rounded-xl bg-white/50 text-gray-900 mb-3 shadow-inner"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />

        <button
          onClick={handleCreate}
          className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-semibold shadow-lg"
        >
          Add Task
        </button>
      </div>

      {/* SEARCH + FILTERS + SORT */}
      <div className="relative z-10 max-w-6xl mx-auto mt-8 flex flex-wrap gap-4 items-center justify-between">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          className="flex-1 p-3 rounded-2xl bg-white/60 backdrop-blur-xl text-gray-900 shadow-inner border border-white/50"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* COLUMN FILTER */}
        <select
          className="p-3 rounded-xl bg-white/60 backdrop-blur-xl text-gray-900 border border-white/50"
          value={filterColumn}
          onChange={(e) => setFilterColumn(e.target.value)}
        >
          <option value="all">All Columns</option>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        {/* COMPLETION FILTER */}
        <select
          className="p-3 rounded-xl bg-white/60 backdrop-blur-xl text-gray-900 border border-white/50"
          value={filterCompletion}
          onChange={(e) => setFilterCompletion(e.target.value)}
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>

        {/* SORT */}
        <select
          className="p-3 rounded-xl bg-white/60 backdrop-blur-xl text-gray-900 border border-white/50"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Newest → Oldest</option>
          <option value="oldest">Oldest → Newest</option>
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
        </select>
      </div>

      {/* KANBAN BOARD */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="relative z-10 grid grid-cols-3 gap-6 max-w-6xl mx-auto mt-10">
          {columns.map((col) => (
            <Droppable droppableId={col} key={col}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="
                    bg-white/50 backdrop-blur-xl
                    border border-white/60 
                    rounded-3xl p-4 min-h-[550px] shadow-2xl
                  "
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
                    {col.replace("_", " ")}
                  </h3>

                  {processedTasks
                    .filter((t) => t.status === col)
                    .map((task, index) => (
                      <Draggable draggableId={task.id} index={index} key={task.id}>
                        {(provided) => (
                          <div
                            className="mb-4"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard
                              task={task}
                              onDelete={handleDelete}
                              onToggle={handleToggle}
                              onEdit={openEditModal}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* EDIT MODAL */}
      {editingTask && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl w-[400px] shadow-2xl border border-white/60">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Task</h2>

            <input
              className="w-full p-3 rounded-xl bg-white/70 text-gray-900 shadow-inner mb-3"
              placeholder="Task title"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            />

            <textarea
              className="w-full p-3 rounded-xl bg-white/70 text-gray-900 shadow-inner mb-3"
              rows={3}
              placeholder="Description"
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setEditingTask(null)}
                className="px-4 py-2 bg-gray-300/70 hover:bg-gray-400 text-gray-800 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl shadow-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
