import { useEffect, useState } from "react";

export default function AdminProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-200">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="w-full lg:w-80 bg-slate-50 p-8 border-r border-slate-100">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden shadow-2xl ring-4 ring-white mb-6">
              <img 
                src={user.profileImage || "/avatar.png"} 
                alt="Admin Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">{user.name}</h2>
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mt-1">System Administrator</p>
            
            <div className="mt-10 w-full space-y-4">
              <button className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 uppercase tracking-widest text-xs">
                Edit Admin Data
              </button>
              <button className="w-full bg-slate-200 text-slate-700 font-black py-4 rounded-2xl hover:bg-slate-300 transition-all uppercase tracking-widest text-xs">
                Security Settings
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-10 lg:p-14">
          <header className="mb-12">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">Account Overview</h1>
            <p className="text-slate-500 font-medium tracking-tight">Manage the administrative details for your system account</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-8">
               <InfoField label="Administrative Name" value={user.name} />
               <InfoField label="System Email" value={user.email} />
               <InfoField label="Access Level" value="Super Admin" />
            </div>
            
            <div className="bg-slate-50 rounded-[2rem] p-10 border border-slate-100">
               <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-8 border-b border-slate-200 pb-4">Activity Stats</h3>
               <div className="grid grid-cols-2 gap-8">
                  <StatItem count={user.stats?.trips || 0} label="Trips Tracked" />
                  <StatItem count={user.stats?.reviews || 0} label="Reviews Moderated" />
                  <StatItem count={12} label="Daily Tasks" />
                  <StatItem count="Live" label="System Status" />
               </div>
            </div>
          </div>

          <div className="mt-12 p-8 bg-blue-50 border border-blue-100 rounded-[2rem] flex items-center justify-between">
            <div>
               <h4 className="text-blue-900 font-black mb-1">System Logs</h4>
               <p className="text-blue-600 text-sm font-medium">Review the last 24 hours of administrative activity.</p>
            </div>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-md hover:scale-105 transition-all">
               View Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoField({ label, value }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">{label}</label>
      <div className="bg-slate-50/50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-800">
        {value}
      </div>
    </div>
  );
}

function StatItem({ count, label }) {
  return (
    <div className="flex flex-col">
      <span className="text-3xl font-black text-blue-600 tracking-tighter mb-1">{count}</span>
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
    </div>
  );
}
