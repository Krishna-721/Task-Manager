'use client';

import { useRouter } from 'next/navigation';
import { logoutUser } from '@/lib/api';

export default function Sidebar() {
  const router = useRouter();

  const Item = ({
    label,
    icon,
    route,
    danger = false,
  }: {
    label: string;
    icon: string;
    route: string | null;
    danger?: boolean;
  }) => (
    <button
      onClick={() => route ? router.push(route) : (logoutUser(), router.replace('/login'))}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left
                  transition-all backdrop-blur-xl
                  ${danger 
                    ? "bg-red-500/20 hover:bg-red-500/30 text-red-300" 
                    : "bg-white/10 hover:bg-white/20 text-white"
                  }`}
    >
      <span className="material-icons text-2xl">{icon}</span>
      <span className="text-lg">{label}</span>
    </button>
  );

  return (
    <aside className="fixed left-0 top-0 h-full w-64 p-6
                      bg-white/10 backdrop-blur-2xl 
                      border-r border-white/20 shadow-2xl
                      flex flex-col gap-6">

      <h1 className="text-2xl font-bold tracking-wide mb-4">
        Project for Prime Trade AI
      </h1>

      <div className="flex flex-col gap-4">

        <Item label="Dashboard" icon="dashboard" route="/dashboard" />
        <Item label="Profile" icon="person" route="/profile" />
        <Item label="Logout" icon="logout" route={null} danger />

      </div>
    </aside>
  );
}
