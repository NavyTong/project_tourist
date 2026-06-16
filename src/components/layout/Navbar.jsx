import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { allDestinations } from "@/data/all-destinations";

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
          id: p.name.toLowerCase().replace(/\s+/g, ""),
          type: "province"
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
      const query = value.toLowerCase().trim();

      // Search provinces
      const filteredProvinces = provinces.filter((p) =>
        p.name.toLowerCase().includes(query)
      ).map(p => ({ ...p, type: "province" }));

      // Search destinations/places
      const filteredPlaces = allDestinations.filter((d) =>
        d.name.toLowerCase().includes(query)
      ).slice(0, 6).map(d => ({
        id: d.id,
        name: d.name,
        province: d.province,
        type: "place"
      }));

      setSuggestions([...filteredProvinces, ...filteredPlaces]);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (item) => {
    if (!user) {
      router.push("/signup");
      return;
    }
    if (item.type === "place") {
      router.push(`/details/${item.id}`);
    } else {
      router.push(`/${item.id}`);
    }
    setSearchQuery("");
    setShowSuggestions(false);
  };

  const executeSearch = () => {
    if (!user) {
      router.push("/signup");
      return;
    }
    const query = searchQuery.toLowerCase().trim();
    if (!query) return;

    const normalizedQuery = query.replace(/\s+/g, "");

    // Check provinces first
    const provinceMatch = provinces.find(p => p.id === normalizedQuery || p.name.toLowerCase().replace(/\s+/g, "") === normalizedQuery);
    if (provinceMatch) {
      router.push(`/${provinceMatch.id}`);
      setSearchQuery("");
      setShowSuggestions(false);
      return;
    }

    // Check destinations/places
    const placeMatch = allDestinations.find(d => d.name.toLowerCase().includes(query));
    if (placeMatch) {
      router.push(`/details/${placeMatch.id}`);
      setSearchQuery("");
      setShowSuggestions(false);
      return;
    }

    alert("No province or place found. Please try another search.");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeSearch();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const provinceResults = suggestions.filter(s => s.type === "province");
  const placeResults = suggestions.filter(s => s.type === "place");

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
              placeholder={user ? "Search province or place..." : "Join to search..."}
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="bg-transparent outline-none px-2 w-40 md:w-56 text-gray-700 placeholder:text-gray-400 text-sm font-medium"
            />
          </div>

          {showSuggestions && suggestions.length > 0 && user && (
            <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden z-[60]">
              {/* Province results */}
              {provinceResults.length > 0 && (
                <>
                  <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Provinces</span>
                  </div>
                  {provinceResults.map((item) => (
                    <button
                      key={`province-${item.id}`}
                      onClick={() => handleSelectSuggestion(item)}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors flex items-center space-x-3"
                    >
                       <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">{item.name}</p>
                        <p className="text-[10px] text-gray-400 font-medium">Province</p>
                      </div>
                    </button>
                  ))}
                </>
              )}

              {/* Place/Destination results */}
              {placeResults.length > 0 && (
                <>
                  <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Places</span>
                  </div>
                  {placeResults.map((item) => (
                    <button
                      key={`place-${item.id}`}
                      onClick={() => handleSelectSuggestion(item)}
                      className="w-full text-left px-4 py-3 hover:bg-violet-50 transition-colors flex items-center space-x-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center text-violet-500 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-800 truncate">{item.name}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{item.province}</p>
                      </div>
                    </button>
                  ))}
                </>
              )}
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

