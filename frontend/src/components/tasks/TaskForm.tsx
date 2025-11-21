"use client";

import { useState } from "react";

interface TaskFormProps {
  initial?: any;
  onSubmit: (data: any) => void;
}

export default function TaskForm({ initial, onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ title, description });
      }}
      className="backdrop-blur-xl bg-white/10 border border-white/20 p-6 rounded-xl space-y-4"
    >
      <div>
        <label className="block text-white mb-1">Title</label>
        <input
          className="w-full px-4 py-2 rounded-lg bg-white/20 text-white outline-none"
          placeholder="Task name..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-white mb-1">Description</label>
        <textarea
          className="w-full px-4 py-2 rounded-lg bg-white/20 text-white outline-none"
          placeholder="Write task details..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
      >
        {initial ? "Save Changes" : "Create Task"}
      </button>
    </form>
  );
}
