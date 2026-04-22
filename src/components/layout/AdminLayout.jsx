import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: <DashboardIcon /> },
    { name: "Provinces", href: "/admin/provinces", icon: <ProvinceIcon /> },
    { name: "Place Management", href: "/admin/placemanagement", icon: <PlaceIcon /> },
    { name: "Activities", href: "/admin/activities", icon: <ActivityIcon /> },
    { name: "Reviews", href: "/admin/review", icon: <ReviewIcon /> },
  ];

  return (
    <div className="h-screen bg-slate-50 flex font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className={`bg-slate-900 text-white w-72 flex-shrink-0 transition-all duration-300 h-screen flex flex-col relative ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-8 border-b border-slate-800 flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-7h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Tourist <span className="text-blue-500">Admin</span></h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Management v2.0</p>
          </div>
        </div>

        <nav className="mt-8 px-4 space-y-2 flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <div className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-200 group ${router.pathname === item.href ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                <div className={`transition-transform group-hover:scale-110 ${router.pathname === item.href ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'}`}>
                  {item.icon}
                </div>
                <span className="font-semibold text-sm">{item.name}</span>
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-8 space-y-4 border-t border-slate-800 mt-auto bg-slate-900">
           <Link href="/">
             <div className="flex items-center gap-4 text-slate-500 hover:text-white cursor-pointer transition-colors group">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
               </svg>
               <span className="text-sm font-bold">Public Site</span>
             </div>
           </Link>

           <button 
             onClick={() => {
               const savedUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
               const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
               const updatedUsers = existingUsers.filter(u => u.email !== savedUser.email);
               localStorage.setItem("users", JSON.stringify(updatedUsers));
               localStorage.removeItem("currentUser");
               window.location.href = "/";
             }}
             className="w-full flex items-center gap-4 text-red-500 hover:text-red-400 cursor-pointer transition-colors group pt-4"
           >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
             </svg>
             <span className="text-sm font-bold">Sign Out</span>
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-10">
          <div className="flex items-center bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 min-w-[300px]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Search system data..." className="bg-transparent border-none outline-none ml-4 text-sm w-full font-medium" />
          </div>

          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer hover:bg-slate-50 p-2.5 rounded-xl transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </div>
            
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>

            <Link href="/admin/profile">
              <div className="flex items-center gap-4 cursor-pointer hover:bg-slate-50 pl-2 pr-4 py-2 rounded-2xl transition-colors group">
                <div className="w-10 h-10 rounded-xl overflow-hidden shadow-inner group-hover:scale-105 transition-transform">
                  <img src={user?.profileImage || "https://ui-avatars.com/api/?name=" + (user?.name || "Admin") + "&background=0284c7&color=fff"} alt="Avatar" />
                </div>
                <div className="hidden md:block">
                  <h4 className="text-sm font-bold text-slate-800 truncate max-w-[120px]">{user?.name || "Admin Account"}</h4>
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-tight">{user?.role || "Manager"}</p>
                </div>
              </div>
            </Link>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-10 flex-1 overflow-auto bg-slate-50/50">
          {children}
        </div>
      </main>
    </div>
  );
};

// Icons components
const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
  </svg>
);

const ProvinceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PlaceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-7h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const ActivityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ReviewIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const ProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export default AdminLayout;
