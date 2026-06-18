import React, { useState, useEffect, useCallback } from "react";

// ─── Star Row ────────────────────────────────────────────────────────────────
function Stars({ rating, max = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? "text-amber-400" : "text-slate-200"} fill-current`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
function DeleteModal({ review, onConfirm, onCancel }) {
  if (!review) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onCancel}
      />
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md animate-[fadeInScale_0.2s_ease-out]">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-800 text-center mb-2">Delete Review?</h3>
        <p className="text-slate-500 text-sm text-center mb-1">
          You are about to delete the review by
        </p>
        <p className="text-slate-800 font-bold text-center mb-6">
          {review.userName} — <span className="text-blue-600">{review.destination}</span>
        </p>
        <p className="text-xs text-slate-400 text-center mb-8">
          This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-2xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(review.id)}
            className="flex-1 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-colors shadow-lg shadow-red-500/30 active:scale-95"
          >
            Delete Review
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Toast Notification ───────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  const colors = {
    success: "bg-emerald-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-[60] flex items-center gap-3 px-5 py-3.5 rounded-2xl text-white text-sm font-semibold shadow-2xl ${colors[type]} animate-[slideUp_0.3s_ease-out]`}
    >
      {type === "success" && (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      )}
      {type === "error" && (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
      {message}
    </div>
  );
}

// ─── Main Review Component ────────────────────────────────────────────────────
export default function Review() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all | pending | approved
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  // ── Fetch reviews ──────────────────────────────────────────────────────────
  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/reviews");
      const data = await res.json();
      setReviews(data);
    } catch {
      showToast("Failed to load reviews", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  const showToast = (message, type = "success") => setToast({ message, type });

  // ── Delete ──────────────────────────────────────────────────────────────────
  const handleDeleteConfirm = async (id) => {
    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setReviews((prev) => prev.filter((r) => r.id !== id));
      setDeleteTarget(null);
      showToast("Review deleted successfully", "success");
    } catch {
      showToast("Failed to delete review", "error");
    }
  };

  // ── Approve / Unapprove ─────────────────────────────────────────────────────
  const handleToggleStatus = async (review) => {
    const newStatus = review.status === "approved" ? "pending" : "approved";
    setUpdatingId(review.id);
    try {
      const res = await fetch(`/api/admin/reviews?id=${review.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error();
      setReviews((prev) =>
        prev.map((r) => (r.id === review.id ? { ...r, status: newStatus } : r))
      );
      showToast(
        newStatus === "approved" ? "Review approved!" : "Review set to pending",
        "info"
      );
    } catch {
      showToast("Failed to update status", "error");
    } finally {
      setUpdatingId(null);
    }
  };

  // ── Derived data ────────────────────────────────────────────────────────────
  const filtered = reviews.filter((r) => {
    const matchFilter =
      filter === "all" || r.status === filter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      r.userName.toLowerCase().includes(q) ||
      r.destination.toLowerCase().includes(q) ||
      r.province.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const stats = {
    total: reviews.length,
    pending: reviews.filter((r) => r.status === "pending").length,
    approved: reviews.filter((r) => r.status === "approved").length,
    avgRating:
      reviews.length
        ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
        : "0.0",
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric",
    });

  // ── Skeleton ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-8">
        <div className="max-w-5xl mx-auto space-y-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 animate-pulse">
              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-full bg-slate-200 flex-shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-1/3" />
                  <div className="h-3 bg-slate-200 rounded w-1/4" />
                  <div className="h-3 bg-slate-200 rounded w-full" />
                  <div className="h-3 bg-slate-200 rounded w-3/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .review-card { animation: fadeIn 0.3s ease-out both; }
      `}</style>

      <div className="min-h-screen bg-slate-50 p-4 md:p-8">
        <div className="max-w-5xl mx-auto space-y-6">

          {/* ── Header ──────────────────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                Review Management
              </h1>
              <p className="text-slate-500 mt-1 text-sm font-medium">
                Approve or delete user feedback across all destinations
              </p>
            </div>
            {stats.pending > 0 && (
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-full text-sm font-bold">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                {stats.pending} Pending Review{stats.pending > 1 ? "s" : ""}
              </div>
            )}
          </div>

          {/* ── Stats Cards ─────────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Reviews", value: stats.total, color: "from-blue-500 to-blue-600", icon: "💬" },
              { label: "Pending", value: stats.pending, color: "from-amber-400 to-amber-500", icon: "⏳" },
              { label: "Approved", value: stats.approved, color: "from-emerald-500 to-emerald-600", icon: "✅" },
              { label: "Avg Rating", value: `${stats.avgRating}★`, color: "from-violet-500 to-violet-600", icon: "⭐" },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-lg mb-3`}>
                  {s.icon}
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{s.label}</p>
                <p className="text-2xl font-black text-slate-800 mt-0.5">{s.value}</p>
              </div>
            ))}
          </div>

          {/* ── Toolbar ─────────────────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by user, destination, province..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
              />
            </div>

            {/* Filter tabs */}
            <div className="flex bg-white border border-slate-200 rounded-xl p-1 gap-1">
              {["all", "pending", "approved"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold capitalize transition-all ${
                    filter === f
                      ? "bg-slate-800 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* ── Review Cards ─────────────────────────────────────────────────── */}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-slate-500 font-medium">No reviews found</p>
              <p className="text-slate-400 text-sm mt-1">Try adjusting your search or filter</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((review, idx) => (
                <div
                  key={review.id}
                  className="review-card bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="flex flex-col md:flex-row gap-5">
                    {/* Avatar */}
                    <div className="flex-shrink-0 flex flex-row md:flex-col items-center gap-3 md:gap-2">
                      <img
                        src={review.userAvatar}
                        alt={review.userName}
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-100 shadow-sm"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.userName)}&background=e2e8f0&color=475569&size=128`;
                        }}
                      />
                      {/* Status badge */}
                      <span
                        className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                          review.status === "approved"
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                            : "bg-amber-50 text-amber-600 border border-amber-200"
                        }`}
                      >
                        {review.status}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <div>
                          <h3 className="text-base font-bold text-slate-800">{review.userName}</h3>
                          <div className="flex flex-wrap items-center gap-2 mt-0.5">
                            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">
                              {review.destination}
                            </span>
                            <span className="text-xs text-slate-400">•</span>
                            <span className="text-xs text-slate-500">{review.province}</span>
                            <span className="text-xs text-slate-400">•</span>
                            <span className="text-xs text-slate-400">{formatDate(review.date)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
                          <Stars rating={review.rating} />
                          <span className="text-xs font-bold text-amber-600 ml-1">{review.rating}/5</span>
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4">
                        &ldquo;{review.comment}&rdquo;
                      </p>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        {/* Approve / Unapprove */}
                        <button
                          onClick={() => handleToggleStatus(review)}
                          disabled={updatingId === review.id}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95 disabled:opacity-60 ${
                            review.status === "approved"
                              ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
                              : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm shadow-emerald-500/30"
                          }`}
                        >
                          {updatingId === review.id ? (
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                          ) : review.status === "approved" ? (
                            <>
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                              </svg>
                              Unapprove
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Approve
                            </>
                          )}
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => setDeleteTarget(review)}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-red-600 bg-white border border-slate-200 hover:bg-red-50 hover:border-red-200 transition-all active:scale-95 ml-auto"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Footer count ────────────────────────────────────────────────── */}
          {filtered.length > 0 && (
            <p className="text-xs text-slate-400 text-center pb-4">
              Showing <span className="font-bold text-slate-600">{filtered.length}</span> of{" "}
              <span className="font-bold text-slate-600">{reviews.length}</span> reviews
            </p>
          )}
        </div>
      </div>

      {/* ── Delete Modal ─────────────────────────────────────────────────────── */}
      <DeleteModal
        review={deleteTarget}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* ── Toast ────────────────────────────────────────────────────────────── */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
