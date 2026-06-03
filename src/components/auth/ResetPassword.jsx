import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const ResetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage("Password reset successfully! Redirecting...");
        setTimeout(() => {
          router.push("/signin");
        }, 2000);
      } else {
        setError(data.message || "An error occurred during reset.");
      }
    } catch (err) {
      console.error("Reset error:", err);
      setError("An error occurred during password reset.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900 font-sans">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse transition-all duration-[3000ms]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6 animate-in fade-in zoom-in duration-500">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-[2.5rem] shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-white tracking-tighter mb-2">Reset Password</h1>
            <p className="text-slate-400 font-medium tracking-tight">Enter your email and a new password</p>
          </div>

          <form onSubmit={handleReset} className="space-y-6">
            <div className="space-y-4">
              <div className="group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-500"
                  required
                />
              </div>

              <div className="group">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-500"
                  required
                />
              </div>

              <div className="group">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm New Password"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-500"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-xs font-bold uppercase tracking-widest text-center animate-in slide-in-from-top-1 bg-red-400/10 py-2 rounded-lg">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="text-green-400 text-xs font-bold uppercase tracking-widest text-center animate-in slide-in-from-top-1 bg-green-400/10 py-2 rounded-lg">
                {successMessage}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-500 active:scale-[0.98] transition-all duration-300 shadow-xl shadow-blue-600/20 uppercase tracking-widest text-xs"
            >
              Reset Password
            </button>
          </form>

          <p className="text-center mt-8 text-slate-500 text-sm font-bold">
            Remembered it?{" "}
            <Link href="/signin" className="text-blue-400 hover:text-blue-300 transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
