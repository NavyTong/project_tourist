import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { siemreapDestinations } from '@/data/siemreap-destinations';
import { phnompenhDestinations } from '@/data/phnompenh-destinations';
import { kampotDestinations } from '@/data/kampot-destinations';
import { kepDestinations } from '@/data/kep-destinations';
import { battambangDestinations } from '@/data/battambang-destinations';
import { sihanoukvilleDestinations } from '@/data/sihanoukville-destinations';
import { kohkongDestinations } from '@/data/kohkong-destinations';
import { mondulkiriDestinations } from '@/data/mondulkiri-destinations';
import { pailinDestinations } from '@/data/pailin-destinations';
import { ratanakiriDestinations } from '@/data/ratanakiri-destinations';
import { allActivities } from '@/data/activities';

const staticSearchableItems = [
  ...siemreapDestinations,
  ...phnompenhDestinations,
  ...kampotDestinations,
  ...kepDestinations,
  ...battambangDestinations,
  ...sihanoukvilleDestinations,
  ...kohkongDestinations,
  ...mondulkiriDestinations,
  ...pailinDestinations,
  ...ratanakiriDestinations,
  ...allActivities
];

export default function AccountProfile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", bio: "", profileImage: "" });
  const [isUpdating, setIsUpdating] = useState(false);
  const [dynamicProvinces, setDynamicProvinces] = useState([]);
  const router = useRouter();

  const allSearchableItems = [...dynamicProvinces, ...staticSearchableItems];

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      
      // Sync with server for latest data
      fetch('/api/auth/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userData.email })
      })
      .then(res => res.json())
      .then(data => {
        if (!data.message) {
          setUser(data);
          localStorage.setItem("currentUser", JSON.stringify(data));
        }
      });
    } else {
      router.push("/signin");
    }

    // Fetch dynamic provinces
    fetch('/api/provinces')
      .then(res => res.json())
      .then(data => setDynamicProvinces(data))
      .catch(err => console.error("Error fetching provinces:", err));
  }, [router]);

  const handleSignOut = () => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Remove the current user from the global users list
    const updatedUsers = existingUsers.filter(u => u.email !== savedUser.email);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    // Clear the current session
    localStorage.removeItem("currentUser");
    router.push("/");
  };

  const handleUpdateProfile = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch('/api/user/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          ...editForm
        })
      });
      const data = await res.json();
      if (!data.message) {
        setUser(data);
        localStorage.setItem("currentUser", JSON.stringify(data));
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleClearRatings = () => {
    const updatedUser = { ...user, ratings: {} };
    setUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="h-48 bg-gradient-to-r from-blue-400 to-indigo-500 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 rounded-2xl border-4 border-white bg-white shadow-lg overflow-hidden">
                <img 
                  src={user.profileImage || "/avatar.png"} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="pt-20 px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">{user.name}</h1>
                <p className="text-gray-500 font-medium">{user.email}</p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => {
                    setEditForm({ name: user.name, bio: user.bio || "", profileImage: user.profileImage || "" });
                    setIsEditing(true);
                  }}
                  className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-2 rounded-xl font-bold transition-all shadow-md active:scale-95"
                >
                  Edit Profile
                </button>
                <button 
                  onClick={handleSignOut}
                  className="bg-red-50 hover:bg-red-100 text-red-600 px-6 py-2 rounded-xl font-bold transition-all active:scale-95 border border-red-100 font-bold"
                >
                  Sign out
                </button>
              </div>
            </div>

            <p className="mt-6 text-gray-600 leading-relaxed max-w-2xl italic">
              "{user.bio || "No bio yet."}"
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              <div className="bg-blue-50 p-4 rounded-2xl text-center">
                <p className="text-2xl font-bold text-blue-600">{user.stats?.trips || 0}</p>
                <p className="text-gray-500 text-xs font-black uppercase tracking-widest">Trips</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-2xl text-center">
                <p className="text-2xl font-bold text-indigo-600">{user.stats?.reviews || 0}</p>
                <p className="text-gray-500 text-xs font-black uppercase tracking-widest">Reviews</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-2xl text-center">
                <p className="text-2xl font-bold text-purple-600">{user.stats?.followers || 0}</p>
                <p className="text-gray-500 text-xs font-black uppercase tracking-widest">Followers</p>
              </div>
            </div>

            {/* Detailed Info */}
            <div className="mt-10 border-t border-gray-100 pt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Account Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Role</p>
                    <p className="text-gray-800 font-bold capitalize">{user.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Joined Date</p>
                    <p className="text-gray-800 font-bold">{user.joinedDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Favorites Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 fill-current" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                My Favorites
              </h2>
              
              {user.favorites && user.favorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {allSearchableItems
                    .filter(item => {
                      const itemId = String(item.id);
                      const itemSlug = item.slug ? String(item.slug) : null;
                      return user.favorites.some(favId => {
                        const sFavId = String(favId);
                        return sFavId === itemId || (itemSlug && sFavId === itemSlug);
                      });
                    })
                    .map(item => (
                      <Link key={item.id} href={item.href || `/details/${item.id}`}>
                        <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
                          <div className="h-40 overflow-hidden relative">
                            <img src={item.images || item.image || "/placeholder.png"} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/10"></div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-gray-800 group-hover:text-blue-500 transition-colors uppercase text-sm tracking-wider">{item.name}</h3>
                            <p className="text-gray-500 text-xs mt-1">{item.province || "Province"}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              ) : (
                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2rem] p-12 text-center group hover:bg-blue-50/50 hover:border-blue-200 transition-all duration-500">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-500 mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                  <p className="text-gray-900 font-bold text-lg mb-2">Your travel bucket list is empty</p>
                  <p className="text-gray-500 font-medium mb-8 max-w-xs mx-auto">Start adding your favorite destinations and plan your dream trip to Cambodia.</p>
                  <Link 
                    href="/destinations" 
                    className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-200 active:scale-95"
                  >
                    <span>Start Planning</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>

            {/* Ratings Section */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  My Ratings
                </h2>
                {user.ratings && Object.keys(user.ratings).length > 0 && (
                  <button
                    onClick={handleClearRatings}
                    className="text-xs font-black uppercase tracking-widest text-red-400 hover:text-red-600 border border-red-200 hover:border-red-400 px-4 py-2 rounded-xl transition-all active:scale-95"
                  >
                    Clear All
                  </button>
                )}
              </div>
              
              {user.ratings && Object.keys(user.ratings).length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(user.ratings).map(([itemId, rating]) => {
                    const item = allSearchableItems.find(i => String(i.id) === String(itemId));
                    return item ? (
                      <div key={itemId} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4">
                          <img src={item.images || item.image || "/placeholder.png"} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                          <div>
                            <h3 className="font-bold text-gray-800 text-sm">{item.name}</h3>
                            <p className="text-gray-500 text-[10px] uppercase tracking-wider">{item.province || "Category"}</p>
                          </div>
                        </div>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < rating ? 'fill-current' : 'text-gray-200 fill-current'}`} viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              ) : (
                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2rem] p-12 text-center group hover:bg-yellow-50/50 hover:border-yellow-200 transition-all duration-500">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-yellow-500 mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <p className="text-gray-900 font-bold text-lg mb-2">No ratings yet</p>
                  <p className="text-gray-500 font-medium mb-8 max-w-xs mx-auto">Share your experiences and help others discover the best of Cambodia by rating the places you've visited.</p>
                  <Link 
                    href="/destinations" 
                    className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-yellow-200 active:scale-95"
                  >
                    <span>Discover Places</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <EditProfileModal 
        isOpen={isEditing} 
        onClose={() => setIsEditing(false)}
        form={editForm}
        setForm={setEditForm}
        onSave={handleUpdateProfile}
        isUpdating={isUpdating}
      />
    </div>
  );
}

function EditProfileModal({ isOpen, onClose, form, setForm, onSave, isUpdating }) {
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit for base64 storage
        alert("File is too large. Please select an image under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-[2.5rem] w-full max-w-lg relative z-10 overflow-hidden shadow-2xl animate-modal-slide-up">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Edit Profile</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Display Name</label>
              <input 
                type="text" 
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 focus:border-blue-400 focus:outline-none transition-all font-medium text-gray-700"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Bio</label>
              <textarea 
                rows="3"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 focus:border-blue-400 focus:outline-none transition-all font-medium text-gray-700 resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Profile Image</label>
              <div className="flex gap-4 items-center mb-4">
                <div className="w-20 h-20 rounded-2xl border-2 border-gray-100 overflow-hidden bg-gray-50 flex-shrink-0">
                  <img src={form.profileImage || "/avatar.png"} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button 
                    onClick={() => fileInputRef.current.click()}
                    className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-sm transition-all active:scale-95 mb-2"
                  >
                    Upload from computer
                  </button>
                  <p className="text-[10px] text-gray-400 font-medium italic">Max size: 2MB. Supports PNG, JPG.</p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  value={form.profileImage}
                  onChange={(e) => setForm({ ...form, profileImage: e.target.value })}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl pl-12 pr-6 py-4 focus:border-blue-400 focus:outline-none transition-all font-medium text-gray-700 text-sm"
                  placeholder="Or paste image URL here..."
                />
              </div>
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <button 
              onClick={onClose}
              className="flex-1 py-4 px-6 rounded-2xl font-bold text-gray-400 hover:bg-gray-50 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button 
              onClick={onSave}
              disabled={isUpdating}
              className="flex-1 py-4 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center"
            >
              {isUpdating ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes modal-slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-modal-slide-up {
          animation: modal-slide-up 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
}
