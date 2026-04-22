import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function FavoriteButton({ destinationId, className = "" }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const dId = String(destinationId);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      const favoriteExists = userData.favorites?.some(id => String(id) === dId);
      setIsFavorite(!!favoriteExists);
    }
  }, [dId]);

  const toggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      router.push('/signin');
      return;
    }

    const newStatus = !isFavorite;
    setIsFavorite(newStatus);

    try {
      const res = await fetch('/api/user/favorite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, destinationId: dId })
      });
      const data = await res.json();
      
      if (data.favorites) {
        const favoriteExists = data.favorites.some(id => String(id) === dId);
        setIsFavorite(favoriteExists);
        
        const updatedUser = { ...user, favorites: data.favorites };
        setUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      setIsFavorite(!newStatus);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`transition-all duration-300 ${className} ${
        isFavorite ? 'text-red-500' : ''
      }`}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 ${isFavorite ? 'fill-current' : 'fill-none'}`}
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
  );
}
