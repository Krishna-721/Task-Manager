export default function TaskCard({ task }: any) {
  return (
    <div
      className="
        p-4 rounded-2xl shadow-xl
        bg-[#fff9d6] 
        border border-yellow-200
        transform hover:-translate-y-1 hover:shadow-2xl
        transition duration-300
      "
      style={{
        background: "linear-gradient(135deg, #fff7c2, #ffeaa7)",
      }}
    >
      <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
      <p className="text-gray-700 text-sm mt-1">{task.description}</p>
    </div>
  );
}
