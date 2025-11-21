'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      await loginUser(form);
      router.replace("/dashboard");
    } catch {
      alert("Invalid credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="
        w-full max-w-md 
        backdrop-blur-xl bg-white/40 
        border border-white/50 
        p-8 rounded-3xl shadow-2xl
      ">

        <h1 className="text-3xl font-bold text-center text-blue-400 drop-shadow-lg">
        Welcome Back ☁️ 
        </h1><br></br>
        <p className="text-center text-blue-950/70 mb-6">
        Log in to your SkyBoard
        </p>

        <input
          className="w-full p-3 rounded-xl bg-white700/60 text-gray-900 mb-4"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="w-full p-3 rounded-xl bg-white700/60 text-gray-900 mb-6"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleLogin}
          className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl shadow-lg"
        >
          Login
        </button>

        <p className="text-center text-black/80 mt-4">
          New here?{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => router.push("/register")}
          >
            Create an account
          </span>
        </p>

      </div>
    </div>
  );
}
