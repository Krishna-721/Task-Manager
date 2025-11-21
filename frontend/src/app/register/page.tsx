'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      await registerUser(form);
      router.replace("/login");
    } catch {
      alert("Email already exists.");
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

        <h1 className="text-3xl font-bold text-center text-blue-600 drop-shadow-lg">
          Create your Account to become a Traveler! 🌤
        </h1><br></br>
        <p className="text-center text-black/70 mb-6">
          Join the SkyBoard journey.
        </p>

        <input
          className="w-full p-3 rounded-xl bg-white-700/60 text-gray-900 mb-4"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

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
          onClick={handleRegister}
          className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl shadow-lg">
          Register
        </button>

        <p className="text-center text-black/80 mt-4">
          Already have an account?{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}
