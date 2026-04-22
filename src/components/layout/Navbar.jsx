import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const dropdownRef = useRef(null);

  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const checkUser = () => {
      const savedUser = localStorage.getItem("currentUser");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(null);
      }
    };

    checkUser();

    // Fetch dynamic provinces for search
    fetch('/api/provinces')
      .then(res => res.json())
      .then(data => {
        // Map API data to the search expected format
        const formatted = data.map(p => ({
          name: p.name,
          id: p.name.toLowerCase().replace(/\s+/g, "")
        }));
        setProvinces(formatted);
      })
      .catch(err => console.error("Navbar fetch error:", err));

    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length >= 2) {
      const filtered = provinces.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase().trim())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (provinceId) => {
    if (!user) {
      router.push("/signup");
      return;
    }
    router.push(`/${provinceId}`);
    setSearchQuery("");
    setShowSuggestions(false);
  };

  const executeSearch = () => {
    if (!user) {
      router.push("/signup");
      return;
    }
    const query = searchQuery.toLowerCase().trim().replace(/\s+/g, "");
    const match = provinces.find(p => p.id === query || p.name.toLowerCase().replace(/\s+/g, "") === query);
    
    if (match) {
      router.push(`/${match.id}`);
      setSearchQuery("");
      setShowSuggestions(false);
    } else if (query !== "") {
      alert("Province not found. Please try another one (e.g., Kampot, Siem Reap).");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeSearch();
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
        {/* Logo */}
        <Link href="/">
          <div className="cursor-pointer group">
            <h1 className="text-2xl md:text-3xl font-black text-blue-500 tracking-tighter group-hover:scale-105 transition-transform duration-300">
              Tourist
            </h1>
          </div>
        </Link>

      {/* Navigation Links - Hidden for non-logged-in users */}
      <ul className={`hidden lg:flex items-center space-x-8 list-none text-gray-600 font-bold text-sm uppercase tracking-wider ${!user && 'opacity-30 pointer-events-none'}`}>
        <li>
          <Link href="/" className="hover:text-blue-500 transition-colors">
            Home
          </Link>
        </li>
        <li>
          <Link href="/destinations" className="hover:text-blue-500 transition-colors">
            Destinations
          </Link>
        </li>
        <li>
          <Link href="/activity" className="hover:text-blue-500 transition-colors">
            Activity
          </Link>
        </li>
        <li>
          <Link href="/aboutcontact" className="hover:text-blue-500 transition-colors">
            Contact
          </Link>
        </li>
        <li>
          <Link href="/about-us" className="hover:text-blue-500 transition-colors">
            About Us
          </Link>
        </li>
      </ul>

      {/* Search and Auth */}
      <div className="flex items-center space-x-6">
        <div className="relative" ref={dropdownRef}>
          <div className="flex items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500/30 transition-all duration-300">
            <button 
              onClick={executeSearch}
              className="hover:scale-110 active:scale-95 transition-transform cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <input
              type="text"
              placeholder={user ? "Search destination..." : "Join to search..."}
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="bg-transparent outline-none px-2 w-40 md:w-56 text-gray-700 placeholder:text-gray-400 text-sm font-medium"
            />
          </div>

          {showSuggestions && suggestions.length > 0 && user && (
            <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden z-[60]">
              {suggestions.map((province) => (
                <button
                  key={province.id}
                  onClick={() => handleSelectSuggestion(province.id)}
                  className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors flex items-center space-x-3"
                >
                   <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{province.name}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {user ? (
          <Link href="/profile-account">
            <div className="flex items-center space-x-3 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-2xl cursor-pointer transition-all active:scale-95 group">
              <div className="w-8 h-8 rounded-xl overflow-hidden shadow-sm ring-2 ring-white">
                <img src={user.profileImage || "/avatar.png"} alt="User" className="w-full h-full object-cover" />
              </div>
              <span className="hidden md:block text-sm font-black text-blue-600 truncate max-w-[100px]">
                {user.name.split(" ")[0]}
              </span>
            </div>
          </Link>
        ) : (
          <Link href="/signup">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-2xl shadow-lg shadow-blue-600/20 text-sm font-black transition-all active:scale-95 uppercase tracking-widest whitespace-nowrap">
              Join Us
            </button>
          </Link>
        )}
      </div>
      </div>
    </nav>
  );
}
