import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Addactivity() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "Adventure",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.name.trim()) return setError("Activity name is required");
    if (!form.description.trim()) return setError("Description is required");

    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          category: form.category,
          description: form.description.trim(),
          image: form.image.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to save");
      }

      // Success → redirect back to activities list
      router.push("/admin/activities");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Image preview
  const showPreview = form.image.trim().startsWith("http");

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 px-8 py-10 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2 text-white">Add New Activity</h2>
            <p className="text-blue-100 text-sm opacity-90">
              Fill in the details to create a new tourist activity
            </p>
          </div>
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-blue-700 rounded-full opacity-50 blur-3xl"></div>
        </div>

        {/* Form Body */}
        <div className="p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Error message */}
            {error && (
              <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm font-medium animate-[fadeInScale_0.2s_ease-out]">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            {/* Activity Name */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">
                Activity Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Sunrise at Angkor Wat"
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all appearance-none"
              >
                <option value="Adventure">Adventure</option>
                <option value="Gastronomy">Gastronomy</option>
                <option value="Heritage">Heritage</option>
                <option value="Relaxation">Relaxation</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the activity details..."
                rows="3"
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all resize-none"
              ></textarea>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">
                Image URL
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full pl-5 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                />
                <div className="absolute right-4 top-3.5 text-gray-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              {/* Image preview */}
              {showPreview && (
                <div className="mt-3 rounded-xl overflow-hidden border border-gray-200 h-32 relative">
                  <img
                    src={form.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                  <div className="absolute top-2 right-2">
                    <span className="bg-black/50 text-white text-[10px] font-bold px-2 py-1 rounded-lg backdrop-blur-sm">
                      PREVIEW
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4">
              <Link href="/admin/activities" className="flex-1 text-center">
                <div className="px-6 py-3.5 bg-white border border-gray-200 text-gray-600 rounded-2xl text-sm font-bold hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer">
                  Cancel
                </div>
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="flex-[1.5] px-6 py-3.5 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-500/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save Activity"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInScale { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}
