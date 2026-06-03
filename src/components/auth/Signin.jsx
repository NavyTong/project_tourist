import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Signin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("currentUser", JSON.stringify(data));
        // Redirect based on the user's actual role
        if (data.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/profile-account");
        }
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900 font-sans">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse transition-all duration-[3000ms]"></div>
      </div>

      {/* Main Glass Card */}
      <div className="relative z-10 w-full max-w-md px-6 animate-in fade-in zoom-in duration-500">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-[2.5rem] shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-white tracking-tighter mb-2">Welcome Back</h1>
            <p className="text-slate-400 font-medium">Enter your credentials to continue</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Role Selection Label */}
            <div className="text-center">
              <span className="text-[10px] font-black tracking-[0.3em] text-slate-500 uppercase">Select Your Role</span>
            </div>

            {/* Role Selection Segmented Control */}
            <div className="bg-slate-800/50 p-1.5 rounded-2xl flex items-center border border-white/5 shadow-inner">
              <button
                type="button"
                onClick={() => {
                  setRole("user");
                  setEmail("user@tourist.com");
                  setPassword("user123");
                }}
                className={`flex-1 py-3 rounded-xl text-sm font-black transition-all duration-300 outline-none ${
                  role === "user" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                USER
              </button>
              <button
                type="button"
                onClick={() => {
                  setRole("admin");
                  setEmail("admin@tourist.com");
                  setPassword("admin123");
                }}
                className={`flex-1 py-3 rounded-xl text-sm font-black transition-all duration-300 outline-none ${
                  role === "admin" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                ADMIN
              </button>
            </div>

            <div className="space-y-4">
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-500 group-hover:border-white/20"
                  required
                />
              </div>

              <div className="relative group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-500 group-hover:border-white/20"
                  required
                />
              </div>
              <div className="flex justify-end mt-2">
                <Link href="/reset-password" className="text-blue-400 text-xs font-bold hover:text-blue-300 transition-colors">
                  Forgot Password?
                </Link>
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-xs font-bold uppercase tracking-widest text-center animate-in slide-in-from-top-1 bg-red-400/10 py-2 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-500 active:scale-[0.98] transition-all duration-300 shadow-xl shadow-blue-600/20 uppercase tracking-widest text-xs"
            >
              Sign In
            </button>
          </form>

          <p className="text-center mt-8 text-slate-500 text-sm font-bold">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-400 hover:text-blue-300 transition-colors">
              Join us today
            </Link>
          </p>

          {/* Hint Overlay (Temporary for UX assistance) */}
          <div className="mt-8 pt-8 border-t border-white/5 text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] text-center leading-relaxed">
            <p 
              className="cursor-pointer hover:text-slate-300 transition-colors mb-2"
              onClick={() => {
                setRole("admin");
                setEmail("admin@tourist.com");
                setPassword("admin123");
              }}
            >
              Demo Admin: admin@tourist.com (admin123)
            </p>
            <p 
              className="cursor-pointer hover:text-slate-300 transition-colors"
              onClick={() => {
                setRole("user");
                setEmail("user@tourist.com");
                setPassword("user123");
              }}
            >
              Demo User: user@tourist.com (user123)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
