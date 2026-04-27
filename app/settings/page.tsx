"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Settings() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [pwSuccess, setPwSuccess] = useState("");
  const [pwError, setPwError] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("user_id");
    if (!id) { router.replace("/login"); return; }
    setUserId(id);
    fetch(`/api/users?id=${id}`).then(r => r.json()).then(data => {
      setUsername(data.username || "");
      setPhone(data.phone || "");
      setEmail(data.email || "");
    });
  }, [router]);

  const handleUpdateProfile = async () => {
    if (!username.trim()) { setError("Username is required."); return; }
    setLoading(true); setError(""); setSuccess("");
    const res = await fetch("/api/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId, username, phone }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error || "Failed to update profile."); return; }
    setSuccess("Profile updated successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) { setPwError("Please fill in all fields."); return; }
    if (newPassword !== confirmPassword) { setPwError("New passwords do not match."); return; }
    if (newPassword.length < 6) { setPwError("Password must be at least 6 characters."); return; }
    setPwLoading(true); setPwError(""); setPwSuccess("");
    const res = await fetch("/api/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId, currentPassword, newPassword }),
    });
    const data = await res.json();
    setPwLoading(false);
    if (!res.ok) { setPwError(data.error || "Failed to change password."); return; }
    setPwSuccess("Password changed successfully!");
    setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
    setTimeout(() => setPwSuccess(""), 3000);
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#FFE4EF] flex flex-col relative overflow-hidden">
      <div className="absolute top-20 left-[-120px] w-80 h-80 bg-pink-300 rounded-full opacity-30 blur-3xl" />
      <div className="absolute bottom-10 right-[-120px] w-80 h-80 bg-pink-400 rounded-full opacity-30 blur-3xl" />

      {/* Header */}
      <div className="bg-[#FFD3DF] px-6 py-3 shadow-sm relative z-10 flex items-center justify-between flex-wrap gap-3">
        <Link href="/homepage" className="flex items-center gap-3">
          <Image src="/logo1.png" alt="Logo" width={55} height={55} className="rounded-full border-2 border-white shadow" />
          <span className="text-black font-bold tracking-[0.3em] text-lg hidden md:block">MARVELOUSLY POLISHED</span>
        </Link>
        <div className="flex flex-wrap gap-2">
          <Link href="/homepage" className="bg-[#FFB6C9] px-4 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">🏠 Home</Link>
          <Link href="/book" className="bg-[#FFB6C9] px-4 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">📅 Book</Link>
          <Link href="/appointments" className="bg-[#FFB6C9] px-4 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">📋 My Appointments</Link>
          <Link href="/payment" className="bg-[#FFB6C9] px-4 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">💳 Payment</Link>
          <Link href="/settings" className="bg-pink-500 px-4 py-2 rounded-full text-white text-sm transition">⚙️ Settings</Link>
          <button onClick={handleLogout} className="bg-gray-200 px-4 py-2 rounded-full text-gray-700 text-sm hover:bg-gray-300 transition">🚪 Logout</button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow flex justify-center px-6 py-12 relative z-10">
        <div className="max-w-2xl w-full space-y-6">

          <h2 className="text-3xl font-bold text-gray-800 mb-2">⚙️ Settings</h2>
          <p className="text-gray-500 text-sm mb-6">Manage your profile and account settings</p>

          {/* Profile Info */}
          <div className="bg-white rounded-2xl shadow-lg border border-pink-100 p-8 space-y-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">👤 Profile Information</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                value={email}
                disabled
                className="w-full p-4 border-2 border-gray-100 rounded-xl text-gray-400 bg-gray-50 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <button
              onClick={handleUpdateProfile}
              disabled={loading}
              className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-2xl shadow-lg border border-pink-100 p-8 space-y-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🔒 Change Password</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition"
                />
                <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500">
                  {showCurrent ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition"
                />
                <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500">
                  {showNew ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition"
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500">
                  {showConfirm ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {pwError && <p className="text-red-500 text-sm">{pwError}</p>}
            {pwSuccess && <p className="text-green-500 text-sm">{pwSuccess}</p>}

            <button
              onClick={handleChangePassword}
              disabled={pwLoading}
              className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition disabled:opacity-50"
            >
              {pwLoading ? "Changing..." : "Change Password"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
