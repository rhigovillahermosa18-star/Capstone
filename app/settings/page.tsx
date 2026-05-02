"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
    if (!username.trim()) { setError("Full name is required."); return; }
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
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF0F5] via-[#FFE4EF] to-[#FFD3DF] flex flex-col relative overflow-hidden">
      <div className="absolute top-[-60px] left-[-100px] w-96 h-96 bg-pink-200 rounded-full opacity-40 blur-3xl" />
      <div className="absolute bottom-0 right-[-100px] w-96 h-96 bg-pink-300 rounded-full opacity-30 blur-3xl" />

      <Navbar active="Settings" mode="auth" />

      {/* Content */}
      <div className="flex-grow flex justify-center px-6 py-10 relative z-10">
        <div className="max-w-5xl w-full">
          <div className="mb-6 flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white text-2xl font-extrabold shadow-lg flex-shrink-0">
              {username ? username.charAt(0).toUpperCase() : "?"}
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-1">
                <span>⚙️</span> Account Settings
              </div>
              <h2 className="text-3xl font-extrabold text-gray-800">Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-400">Profile</span></h2>
              <p className="text-gray-500 text-sm">{email}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">

            {/* Left - Profile Info */}
            <div className="bg-white rounded-2xl shadow-lg border border-pink-100 p-8 space-y-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">👤 Profile Information</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input value={email} disabled className="w-full px-4 py-3 border border-gray-100 rounded-xl text-gray-400 bg-gray-50 text-sm cursor-not-allowed" />
                <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
              </div>
              {error && <div className="bg-red-50 border border-red-200 text-red-500 text-sm px-4 py-2.5 rounded-xl">{error}</div>}
              {success && <div className="bg-green-50 border border-green-200 text-green-600 text-sm px-4 py-2.5 rounded-xl">{success}</div>}
              <button onClick={handleUpdateProfile} disabled={loading} className="w-full bg-gradient-to-r from-pink-500 to-pink-400 text-white py-3 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-pink-200 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50">
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>

            {/* Right - Change Password */}
            <div className="bg-white rounded-2xl shadow-lg border border-pink-100 p-8 space-y-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🔒 Change Password</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <div className="relative">
                  <input type={showCurrent ? "text" : "password"} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition" />
                  <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500">{showCurrent ? "🙈" : "👁️"}</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <div className="relative">
                  <input type={showNew ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition" />
                  <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500">{showNew ? "🙈" : "👁️"}</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <div className="relative">
                  <input type={showConfirm ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition" />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500">{showConfirm ? "🙈" : "👁️"}</button>
                </div>
              </div>
              {pwError && <div className="bg-red-50 border border-red-200 text-red-500 text-sm px-4 py-2.5 rounded-xl">{pwError}</div>}
              {pwSuccess && <div className="bg-green-50 border border-green-200 text-green-600 text-sm px-4 py-2.5 rounded-xl">{pwSuccess}</div>}
              <button onClick={handleChangePassword} disabled={pwLoading} className="w-full bg-gradient-to-r from-pink-500 to-pink-400 text-white py-3 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-pink-200 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50">
                {pwLoading ? "Changing..." : "Change Password"}
              </button>
            </div>

          </div>
        </div>
      </div>

      <Footer isLoggedIn={true} />
    </div>
  );
}
