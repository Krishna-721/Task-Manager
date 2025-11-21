'use client';

import Link from 'next/link';
<div className="p-10 text-4xl font-bold text-primary bg-secondary">
  Tailwind Working ✓
</div>


export default function HomePage() {
  return (
    
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white">

      {/* Glass Container */}
      <div className="max-w-2xl w-full text-center 
        backdrop-blur-2xl bg-white/10 border border-white/20 
        rounded-3xl p-12 shadow-2xl animate-fadeIn">

        <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
        Simple TaskMaster Web App 
        </h1>

        <p className="text-white/80 text-lg mb-10 leading-relaxed">
          A modern authentication + dashboard system built with 
          <span className="font-semibold"> FastAPI, MongoDB Atlas</span>, and 
          <span className="font-semibold"> Next.js</span>.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-6">
          <Link href="/login">
            <button className="px-8 py-3 rounded-xl bg-blue-500/70 hover:bg-blue-500/90
              font-semibold transition shadow-lg">
              Login
            </button>
          </Link>

          <Link href="/register">
            <button className="px-8 py-3 rounded-xl bg-green-500/70 hover:bg-green-500/90
              font-semibold transition shadow-lg">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
