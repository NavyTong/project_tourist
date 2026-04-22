import React from "react";
import Link from "next/link";

export default function Addtouringplace() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 px-8 py-10 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2 text-white">Add New Place</h2>
            <p className="text-blue-100 text-sm opacity-90">Register a new tourist destination or landmark</p>
          </div>
          {/* Decorative circles */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-blue-700 rounded-full opacity-50 blur-3xl"></div>
        </div>

        {/* Form Body */}
        <div className="p-8">
          <form className="space-y-6 text-black">
            {/* Place Name */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">
                Place Name
              </label>
              <input
                type="text"
                placeholder="e.g. Angkor Wat"
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>

            {/* Province Selection */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">
                Province
              </label>
              <input
                type="text"
                placeholder="e.g. Siem Reap"
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">
                Description
              </label>
              <textarea
                placeholder="Brief description of the destination..."
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
                  placeholder="https://example.com/place.jpg"
                  className="w-full pl-5 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                />
                <div className="absolute right-4 top-3.5 text-gray-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4">
              <Link href="/admin/placemanagement" className="flex-1 text-center">
                <div className="px-6 py-3.5 bg-white border border-gray-200 text-gray-600 rounded-2xl text-sm font-bold hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer">
                  Cancel
                </div>
              </Link>
              <button
                type="submit"
                className="flex-[1.5] px-6 py-3.5 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-500/25"
              >
                Save Place
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
