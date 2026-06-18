import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  const colors = {
    success: "bg-emerald-500",
    error: "bg-red-500",
  };

  return (
    <div className={`fixed bottom-6 right-6 z-[60] flex items-center gap-3 px-5 py-3.5 rounded-2xl text-white text-sm font-semibold shadow-2xl ${colors[type]} animate-[slideUp_0.3s_ease-out]`}>
      {type === "success" ? (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
      ) : (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
      )}
      {message}
    </div>
  );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
function DeleteModal({ activity, onConfirm, onCancel }) {
  if (!activity) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md animate-[fadeInScale_0.2s_ease-out]">
        <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-800 text-center mb-2">Delete Activity?</h3>
        <p className="text-slate-500 text-sm text-center mb-1">You are about to delete</p>
        <p className="text-slate-800 font-bold text-center mb-2">{activity.name}</p>
        <p className="text-xs text-slate-400 text-center mb-8">This action cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-3 rounded-2xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button onClick={() => onConfirm(activity.id)} className="flex-1 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-colors shadow-lg shadow-red-500/30 active:scale-95">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  const categories = ["All", "Adventure", "Gastronomy", "Heritage", "Relaxation"];

  const showToast = (message, type = "success") => setToast({ message, type });

  // ── Fetch activities from API ───────────────────────────────────────────────
  const fetchActivities = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/activities");
      const data = await res.json();
      setActivities(data);
    } catch {
      showToast("Failed to load activities", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchActivities(); }, [fetchActivities]);

  // ── Delete activity ─────────────────────────────────────────────────────────
  const handleDeleteConfirm = async (id) => {
    try {
      const res = await fetch(`/api/admin/activities?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setActivities((prev) => prev.filter((a) => a.id !== id));
      setDeleteTarget(null);
      showToast("Activity deleted successfully");
    } catch {
      showToast("Failed to delete activity", "error");
    }
  };

  // ── Filter ──────────────────────────────────────────────────────────────────
  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || activity.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categoryColors = {
    Adventure: "bg-blue-100 text-blue-600",
    Gastronomy: "bg-amber-100 text-amber-600",
    Heritage: "bg-red-100 text-red-600",
    Relaxation: "bg-emerald-100 text-emerald-600",
  };

  // ── Skeleton loading ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-8 text-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="h-7 w-56 bg-slate-200 rounded-lg animate-pulse mb-2" />
            <div className="h-4 w-72 bg-slate-200 rounded-lg animate-pulse" />
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-gray-50 animate-pulse">
                <div className="w-14 h-10 bg-slate-200 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-1/3" />
                  <div className="h-3 bg-slate-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes fadeInScale { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="min-h-screen bg-slate-50 p-4 md:p-8 text-black">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Activities Management</h1>
              <p className="text-gray-500 text-sm">Manage and organize all tourist activities</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-black w-full sm:w-48"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "All" ? "All Categories" : cat}
                  </option>
                ))}
              </select>

              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-full text-black"
                />
                <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <Link href="/admin/addactivity">
                <div className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center gap-2 whitespace-nowrap cursor-pointer">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Activity
                </div>
              </Link>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">Image</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Activity Name</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Description</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredActivities.length > 0 ? (
                    filteredActivities.map((activity) => (
                      <tr key={activity.id} className="hover:bg-blue-50/30 transition-colors group">
                        <td className="px-6 py-3">
                          <div className="relative h-10 w-14 rounded-lg overflow-hidden ring-1 ring-gray-100 group-hover:ring-blue-200 transition-all">
                            <img
                              src={activity.image}
                              alt={activity.name}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-3">
                          <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                            {activity.name}
                          </span>
                        </td>
                        <td className="px-6 py-3">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${categoryColors[activity.category] || "bg-gray-100 text-gray-600"}`}>
                            {activity.category}
                          </span>
                        </td>
                        <td className="px-6 py-3 hidden md:table-cell">
                          <p className="text-sm text-gray-500 line-clamp-1 max-w-xs">{activity.description}</p>
                        </td>
                        <td className="px-6 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setDeleteTarget(activity)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                              title="Delete"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-gray-400 text-sm">
                        No activities found matching your search or filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer stats */}
            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Showing <span className="font-semibold text-gray-700">{filteredActivities.length}</span> of <span className="font-semibold text-gray-700">{activities.length}</span> activities
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal
        activity={deleteTarget}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
};

export default Activities;
