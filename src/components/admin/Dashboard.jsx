import React from "react";
import Link from "next/link";
import { provinces } from "@/data/provinces";
import { allDestinations } from "@/data/all-destinations";
import { allActivities } from "@/data/activities";

const Dashboard = () => {
  const stats = [
    { title: "Total Provinces", value: provinces.length.toString(), change: "+2 this month", icon: <ProvinceIcon />, color: "from-blue-500 to-blue-600" },
    { title: "Total Destinations", value: allDestinations.length.toString(), change: "+12 this week", icon: <PlaceIcon />, color: "from-violet-500 to-violet-600" },
    { title: "Active Activities", value: allActivities.length.toString(), change: "+5 new", icon: <ActivityIcon />, color: "from-emerald-500 to-emerald-600" },
    { title: "Pending Reviews", value: "18", change: "Requires action", icon: <ReviewIcon />, color: "from-amber-500 to-amber-600" },
  ];

  const recentActivities = [
    { id: 1, action: "Added new destination", target: "Lake Yeak Laom", province: "Ratanakiri", time: "2 hours ago", status: "Completed" },
    { id: 2, action: "Updated description", target: "Bousra Waterfall", province: "Mondulkiri", time: "5 hours ago", status: "Processing" },
    { id: 3, action: "New review approved", target: "Angkor Wat", province: "Siem Reap", time: "1 day ago", status: "Completed" },
    { id: 4, action: "Added new province", target: "Koh Kong", province: "Coastal", time: "2 days ago", status: "Completed" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">System Overview</h2>
        <p className="text-slate-500 mt-1 font-medium">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group cursor-default">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              {stat.icon}
            </div>
            <h4 className="text-slate-500 text-sm font-bold uppercase tracking-wider">{stat.title}</h4>
            <div className="flex items-baseline gap-3 mt-2">
              <span className="text-4xl font-black text-slate-800 tracking-tighter">{stat.value}</span>
              <span className="text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent Activity Table */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
            <h3 className="text-xl font-bold text-slate-800">Recent Activity</h3>
            <button className="text-blue-600 text-sm font-bold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto p-4">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-[11px] uppercase tracking-[0.2em] font-black">
                  <th className="px-6 py-4">Action</th>
                  <th className="px-6 py-4">Target</th>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentActivities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-slate-50 group transition-colors">
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{activity.action}</div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-sm font-semibold text-slate-600">{activity.target}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{activity.province}</div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-500 font-medium">{activity.time}</td>
                    <td className="px-6 py-5 whitespace-nowrap text-right">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl ${activity.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                        {activity.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
           <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl shadow-slate-900/40 h-full flex flex-col justify-between">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Quick Actions</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">Easily manage your content with one-click shortcuts.</p>
              </div>
              
              <div className="space-y-4 mt-12 relative z-10">
                <Link href="/admin/addprovince">
                  <button className="w-full bg-white text-slate-900 font-bold py-4 rounded-2xl hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-white/5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    New Province
                  </button>
                </Link>
                <Link href="/admin/addtouringplace">
                  <button className="w-full bg-slate-800 text-white font-bold py-4 rounded-2xl border border-slate-700 hover:bg-slate-700 transition-all duration-300 flex items-center justify-center gap-3 active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    Add Destination
                  </button>
                </Link>
              </div>

              {/* Decorative circle */}
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl group-hover:bg-blue-600/30 transition-colors"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

// Internal icon components (replicating what's in layout for consistency)
const ProvinceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
  </svg>
);

const PlaceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" />
  </svg>
);

const ActivityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
  </svg>
);

const ReviewIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915" />
  </svg>
);

export default Dashboard;
