'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProfile, updateProfile } from "@/lib/api";

export default function ProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getProfile();
        setProfile({
          name: data.name || "",
          email: data.email || "",
          bio: data.bio || "",
        });
      } catch {
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile(profile);
      alert("Profile updated!");
    } catch {
      alert("Update failed.");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 flex justify-center">

      <div className="
        w-full max-w-xl 
        backdrop-blur-xl bg-white/40 
        border border-white/50 
        p-8 rounded-3xl shadow-2xl
      ">

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="
            w-28 h-28 rounded-full 
            bg-white/50 backdrop-blur-md 
            border border-white/60 
            flex items-center justify-center shadow-lg
          ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              stroke="white"
              fill="none"
              className="w-16 h-16"
              viewBox="0 0 24 24"
            >
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                d="M12 12c2.8 0 5-2.2 5-5s-2.2-5-5-5-5 2.2-5 5 2.2 5 5 5zm0 2c-4.4 0-8 2.4-8 6v1h16v-1c0-3.6-3.6-6-8-6z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl text-center text-black drop-shadow-lg mb-6">
          Your SkyBoard Profile
        </h2>

        {/* Form */}
        <input
          className="w-full p-3 rounded-xl bg-white/60 text-gray-900 mb-4"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          placeholder="Full Name"
        />

        <input
          className="w-full p-3 rounded-xl bg-white/60 text-gray-900 mb-4"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          placeholder="Email Address"
        />

        <textarea
          className="w-full p-3 rounded-xl bg-white/60 text-gray-900 mb-4"
          rows={4}
          placeholder="Bio"
          value={profile.bio}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
        />

        <div className="flex justify-between mt-6">
          <button
            onClick={() => router.push("/dashboard")}
            className="px-5 py-2 bg-white/40 hover:bg-white/50 rounded-xl text-gray-900 shadow-md"
          >
            ← Back
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="
              px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white 
              rounded-xl shadow-lg disabled:opacity-50
            "
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </div>

    </div>
  );
}
