import React from "react";

export default function Review() {
  return (
    <div className="min-h-screen flex justify-center bg-slate-50 p-4 md:p-8">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">User Reviews</h1>
            <p className="text-slate-500 mt-1">Manage and respond to recent feedback</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm inline-flex items-center gap-2">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
            <span className="text-slate-700 font-medium text-sm">2 Pending</span>
          </div>
        </div>

        {/* Review Card 1 */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm transition-all hover:shadow-md">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <img
                className="rounded-full w-16 h-16 md:w-20 md:h-20 object-cover border border-slate-100 shadow-sm"
                src="https://cdn.mos.cms.futurecdn.net/Z7t7AD6Xtni6T9r2YiNuK-1200-80.jpg"
                alt="Niana Holloway"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Niana Holloway</h3>
                  <p className="text-sm text-slate-500 mt-0.5">August 28, 2020</p>
                </div>
                <div className="flex gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-3.5 h-3.5 text-amber-500 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-slate-600 text-base leading-relaxed mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                "So you're going abroad, you've chosen your destination and now you have to choose where to visit. This is the best vacation that I have ever had, and the viewing is a great place to visit to relax. It's a good way to spend my holiday."
              </p>
              
              <div className="flex flex-wrap gap-3">
                <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors">
                  Respond
                </button>
                <button className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg border border-slate-200 transition-colors shadow-sm">
                  Share Review
                </button>
                <button className="px-5 py-2.5 bg-white hover:bg-red-50 text-red-600 text-sm font-medium rounded-lg border border-slate-200 transition-colors shadow-sm sm:ml-auto">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Review Card 2 */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm transition-all hover:shadow-md">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <img
                className="rounded-full w-16 h-16 md:w-20 md:h-20 object-cover border border-slate-100 shadow-sm"
                src="https://ui-avatars.com/api/?name=David+Chen&background=f8fafc&color=334155&size=128"
                alt="David Chen"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">David Chen</h3>
                  <p className="text-sm text-slate-500 mt-0.5">September 12, 2021</p>
                </div>
                <div className="flex gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                  {[1, 2, 3, 4].map((star) => (
                    <svg key={star} className="w-3.5 h-3.5 text-amber-500 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <svg className="w-3.5 h-3.5 text-amber-200 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <p className="text-slate-600 text-base leading-relaxed mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                "Absolutely stunning experience! The tour guides were very knowledgeable and the scenery was breathtaking. Would definitely recommend this to anyone looking for a great adventure."
              </p>
              
              <div className="flex flex-wrap gap-3">
                <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors">
                  Respond
                </button>
                <button className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg border border-slate-200 transition-colors shadow-sm">
                  Share Review
                </button>
                <button className="px-5 py-2.5 bg-white hover:bg-red-50 text-red-600 text-sm font-medium rounded-lg border border-slate-200 transition-colors shadow-sm sm:ml-auto">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
