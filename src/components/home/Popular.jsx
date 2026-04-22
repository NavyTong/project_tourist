import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Popular() {
  const [provinces, setProvinces] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      const res = await fetch("/api/provinces");
      const data = await res.json();
      setProvinces(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleToggleFavorite = async (e, itemId) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      router.push("/signin");
      return;
    }

    try {
      const res = await fetch("/api/user/favorite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, destinationId: itemId }),
      });
      const data = await res.json();
      if (data.favorites) {
        const updatedUser = { ...user, favorites: data.favorites };
        setUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      }
    } catch (err) {
      console.error("Favorite error:", err);
    }
  };

  const isFavorited = (itemId) => {
    return user?.favorites?.includes(String(itemId));
  };

  return (
    <section className="px-6 md:px-16 lg:px-24 py-20 bg-slate-50">
      {/* Title */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Popular Destinations
        </h1>
        <p className="text-blue-500 font-semibold tracking-wide uppercase text-sm">Explore Best Places</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {isLoading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-3xl"></div>
          ))
        ) : provinces.slice(0, 4).map((place) => (
          <Link href={place.href} key={place.name}>
            <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100">
              <div className="h-56 overflow-hidden relative">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                <button 
                  onClick={(e) => handleToggleFavorite(e, place.id)}
                  className={`absolute top-4 right-4 p-3 rounded-2xl backdrop-blur-md border transition-all duration-300 ${
                    isFavorited(place.id) 
                    ? 'bg-red-500/80 border-red-400 text-white fill-current shadow-lg shadow-red-500/30' 
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isFavorited(place.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-500 transition-colors">
                    {place.name}
                  </h2>
                  <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-wider">Province</div>
                </div>
                <p className="text-gray-500 text-sm mt-3 line-clamp-2">
                  Discover the majestic beauty and unique culture of {place.name}.
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
