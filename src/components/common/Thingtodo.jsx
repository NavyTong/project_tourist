import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { adventures, foods, cultural, relaxation } from '@/data/activities';

export default function Thingtodo() {
  const [user, setUser] = useState(null);
  const router = useRouter();

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
    return user?.favorites?.includes(String(itemId)) || user?.favorites?.includes(Number(itemId));
  };

  return (
    <section className="px-8 py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold text-blue-900 mb-4 tracking-tight">Things To Do</h1>
          <p className="text-gray-500 text-lg">Experience the best adventures, flavors, and culture in Cambodia</p>
        </div>

        {/* Hero Banner */}
        <div className="relative h-80 rounded-[2.5rem] overflow-hidden mb-24 shadow-2xl transition-transform duration-700 hover:scale-[1.01]">
          <img
            src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1920&auto=format&fit=crop"
            alt="Angkor Wat Discover Haven"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-12">
            <h2 className="text-5xl font-bold text-white mb-2">Discover Haven</h2>
            <p className="text-gray-200 text-xl font-medium">Explore the majestic beauty of the kingdom</p>
          </div>
        </div>

        {/* Adventure Section */}
        <ActivitySection 
            title="Adventure" 
            items={adventures} 
            color="blue" 
            onFavorite={handleToggleFavorite}
            isFavorited={isFavorited}
        />

        <div className="my-24 border-t border-gray-100 italic text-center text-gray-400">“Travel is the only thing you buy that makes you richer.”</div>

        {/* Food Section */}
        <ActivitySection 
            title="Gastronomy & Food" 
            items={foods} 
            color="amber" 
            onFavorite={handleToggleFavorite}
            isFavorited={isFavorited}
        />

        <div className="my-24 border-t border-gray-100"></div>

        {/* Culture Section */}
        <ActivitySection 
            title="Heritage & Culture" 
            items={cultural} 
            color="red" 
            onFavorite={handleToggleFavorite}
            isFavorited={isFavorited}
        />

        <div className="my-24 border-t border-gray-100"></div>

        {/* Relaxation Section */}
        <ActivitySection 
            title="Relaxation & Wellness" 
            items={relaxation} 
            color="emerald" 
            onFavorite={handleToggleFavorite}
            isFavorited={isFavorited}
        />
      </div>
    </section>
  );
}

function ActivitySection({ title, items, color, onFavorite, isFavorited }) {
  return (
    <div className="mb-24">
      <div className="mb-12">
        <h3 className="text-4xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-400 text-lg">Curated experiences for an unforgettable journey</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item) => (
          <div
            key={item.name}
            className="bg-white rounded-[2rem] overflow-hidden shadow-md hover:shadow-22xl transition-all duration-500 group cursor-pointer border border-gray-100 flex flex-col h-full"
          >
            <div className="h-64 overflow-hidden relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
              
              <button
                onClick={(e) => onFavorite(e, item.id)}
                className={`absolute top-6 right-6 p-3 rounded-2xl backdrop-blur-md border transition-all duration-300 ${
                  isFavorited(item.id)
                    ? "bg-red-500/80 border-red-400 text-white fill-current shadow-lg shadow-red-500/30"
                    : "bg-white/20 border-white/30 text-white hover:bg-white/40"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill={isFavorited(item.id) ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
            <div className="p-7 flex flex-col flex-1">
              <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-500 transition-colors">
                {item.name}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                {item.description}
              </p>
              <div className="flex items-center text-blue-500 font-bold group-hover:translate-x-2 transition-transform select-none">
                <span>Learn More</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
