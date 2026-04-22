import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const newUserRequest = {
        email,
        password,
        role,
        name: email.split("@")[0],
        profileImage: "/avatar.png",
        bio: "Welcome to my profile! I am a new traveler on Tourist.",
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        stats: { trips: 0, reviews: 0, followers: 0 }
      };

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserRequest),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("currentUser", JSON.stringify(data));
        router.push(data.role === "admin" ? "/admin" : "/profile-account");
      } else {
        alert(data.message || "An error occurred during signup.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("An error occurred during signup.");
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
            <h1 className="text-4xl font-black text-white tracking-tighter mb-2">Join Tourist</h1>
            <p className="text-slate-400 font-medium tracking-tight">Create your account to start exploring</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            {/* Role Selection Label */}
            <div className="text-center">
              <span className="text-[10px] font-black tracking-[0.3em] text-slate-500 uppercase">Select Your Rule</span>
            </div>

            {/* Role Selection Segmented Control */}
            <div className="bg-slate-800/50 p-1.5 rounded-2xl flex items-center border border-white/5 shadow-inner">
              <button
                type="button"
                onClick={() => setRole("user")}
                className={`flex-1 py-3 rounded-xl text-sm font-black transition-all duration-300 outline-none ${
                  role === "user" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                USER
              </button>
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`flex-1 py-3 rounded-xl text-sm font-black transition-all duration-300 outline-none ${
                  role === "admin" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                ADMIN
              </button>
            </div>

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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create Password"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-500"
                  required
                />
              </div>

              <div className="group">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-500 active:scale-[0.98] transition-all duration-300 shadow-xl shadow-blue-600/20 uppercase tracking-widest text-xs"
            >
              Create Account
            </button>
          </form>

          <p className="text-center mt-8 text-slate-500 text-sm font-bold">
            Already registered?{" "}
            <Link href="/signin" className="text-blue-400 hover:text-blue-300 transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
