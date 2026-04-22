export default function () {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500 p-50">
      <div className="w-400 bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Review</h1>
        <div>
          {/* user review */}
          <div className="mb-6">
            <div className="flex item-center gap-4 mb-3">
              <img
                className="rounded-full w-12 h-12"
                src="https://cdn.mos.cms.futurecdn.net/Z7t7AD6Xtni6T9r2YiNuK-1200-80.jpg"
                alt=""
              />
              <div>
                <p className="font-medium text-gray-800">Niana Holloway</p>
                <p className="text-sm text-gray-500">28 Aug 2020</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              So youre are going abraod, you’ve chosen your destination and now
              you have to choose where to visit , this is the best vocation that
              i have even met, and the viewing is a great place to visit to
              relax and its a good way to spend my holiday.
            </p>
          </div>
        </div>
        <div className="justify-between gap-3 flex">
          <button className="bg-yellow-500 p-3 rounded-md flex-1 py-2 transition">
            Share Review
          </button>
          <button className="bg-blue-500 p-3 rounded-md flex-1 py-2 transition">
            Respond
          </button>
          <button className="bg-red-500 p-3 rounded-md flex-1 py-2 transition">
            Delete Review
          </button>
        </div>
        <div>
          {/* user review */}
          <div className="mb-6">
            <div className="flex item-center gap-4 mb-3">
              <img
                className="rounded-full w-12 h-12"
                src="https://cdn.mos.cms.futurecdn.net/Z7t7AD6Xtni6T9r2YiNuK-1200-80.jpg"
                alt=""
              />
              <div>
                <p className="font-medium text-gray-800">Niana Holloway</p>
                <p className="text-sm text-gray-500">28 Aug 2020</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              So youre are going abraod, you’ve chosen your destination and now
              you have to choose where to visit , this is the best vocation that
              i have even met, and the viewing is a great place to visit to
              relax and its a good way to spend my holiday.
            </p>
          </div>
          <div className="justify-between gap-3 flex">
            <button className="bg-yellow-500 p-3 rounded-md flex-1 py-2 transition">
              Share Review
            </button>
            <button className="bg-blue-500 p-3 rounded-md flex-1 py-2 transition">
              Respond
            </button>
            <button className="bg-red-500 p-3 rounded-md flex-1 py-2 transition">
              Delete Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
