"use client";

interface TaskCardProps {
  task: any;
  onDelete: (id: string) => void;
  onToggle: (task: any) => void;
  onEdit: (task: any) => void;
}

export default function TaskCard({ task, onDelete, onToggle, onEdit }: TaskCardProps) {
  return (
    <div
      className="
        bg-white/70 
        backdrop-blur-xl 
        rounded-2xl 
        p-4 
        shadow-xl 
        border border-white/60
        transition-all
      "
    >
      <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>

      {task.description && (
        <p className="text-gray-700 text-sm mt-1">{task.description}</p>
      )}

      <div className="flex justify-end gap-3 mt-4">

        {/* EDIT */}
        <button
          onClick={() => onEdit(task)}
          className="
            px-3 py-1 
            rounded-xl
            text-sm font-semibold
            transition
            bg-yellow-500/70 hover:bg-yellow-600 text-white
          "
        >
          Edit
        </button>

        {/* DONE/UNDO */}
        <button
          onClick={() => onToggle(task)}
          className="
            px-3 py-1 
            rounded-xl
            text-sm font-semibold
            transition 
            bg-sky-500/70 hover:bg-sky-600 text-white
          "
        >
          {task.completed ? "Undo" : "Done"}
        </button>

        {/* DELETE */}
        <button
          onClick={() => onDelete(task.id)}
          className="
            px-3 py-1 
            rounded-xl
            text-sm font-semibold
            transition 
            bg-red-500/70 hover:bg-red-600 text-white
          "
        >
          Delete
        </button>

      </div>
    </div>
  );
}
