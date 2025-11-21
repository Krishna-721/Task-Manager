export interface Task {
  title: string;
  description: string;
}

export default function TaskCard({ task }: { task: Task }) {
  return (
    <div
      className={`
        p-4 rounded-xl shadow-lg 
        bg-yellow-100 
        transform rotate-[-2deg] hover:rotate-0
        transition-all cursor-grab active:cursor-grabbing
        border border-yellow-200 
        backdrop-blur-xl
      `}
    >
      <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
      <p className="text-gray-600 text-sm mt-1">{task.description}</p>
    </div>
  );
}
