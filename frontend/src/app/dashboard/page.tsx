'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getTasks,
  createTask,
  updateTask,
  getProfile,
  logoutUser,
} from '@/lib/api';

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from '@/components/TaskCard';

export default function DashboardPage() {
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);

  const columns = ["todo", "in_progress", "done"];

  useEffect(() => {
    async function load() {
      try {
        const user = await getProfile();
        const t = await getTasks();
        setProfile(user);
        setTasks(t);
      } catch (err) {
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const onDragEnd = async (result: any) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    await updateTask(taskId, { status: newStatus } as any);

    setTasks(prev =>
      prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t)
    );
  };

  const handleCreate = async () => {
    if (!newTask.title.trim()) return;

    const saved = await createTask({ ...newTask, status: "todo" } as any);
    setTasks([saved, ...tasks]);
    setNewTask({ title: "", description: "" });
  };

  const handleLogout = () => {
    logoutUser();
    router.replace('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-300">
        <div className="animate-spin h-12 w-12 border-4 border-white border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-10 text-gray-900"
      style={{
        background: `linear-gradient(to bottom, #7ecbff 0%, #a6dcff 40%, #dff3ff 100%)`,
      }}
    >

      {/* CLOUD BACKGROUND DECOR */}
      <div className="absolute top-10 left-10 w-64 h-32 bg-white/70 blur-3xl rounded-full"></div>
      <div className="absolute top-40 right-10 w-72 h-40 bg-white/60 blur-3xl rounded-full"></div>
      <div className="absolute bottom-32 left-20 w-80 h-48 bg-white/50 blur-[90px] rounded-full"></div>

      {/* ZEN HEADER */}
      <div className="text-center relative z-10">
        <h1 className="text-5xl font-bold tracking-tight text-white drop-shadow-lg">
          空へ — “To The Sky”
        </h1>
        <p className="text-white/90 text-xl mt-2 drop-shadow-md">
          一歩ずつ進む — One step at a time
        </p>
      </div>

      {/* PROFILE + LOGOUT */}
      <div className="relative z-10 flex justify-between max-w-5xl mx-auto mt-10">
        <h2 className="text-xl font-semibold text-white drop-shadow-lg">
          Welcome, {profile?.name || profile?.email}
        </h2>

        <div className="flex items-center gap-4">
          
          <button
            onClick={() => router.push('/profile')}
            className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-lg flex items-center justify-center hover:bg-white/40 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" stroke="white" fill="none" viewBox="0 0 24 24">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.8 0 5-2.2 5-5s-2.2-5-5-5-5 2.2-5 5 2.2 5 5 5zm0 2c-4.4 0-8 2.4-8 6v1h16v-1c0-3.6-3.6-6-8-6z"/>
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

      {/* CREATE TASK */}
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
        ></textarea>

        <button
          onClick={handleCreate}
          className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-semibold shadow-lg"
        >
          Add Task
        </button>
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
                    {col.replace('_', ' ')}
                  </h3>

                  {tasks
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
                            <TaskCard task={task} />
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

    </div>
  );
}
