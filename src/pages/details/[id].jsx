import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
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
import Link from 'next/link';

const allDestinations = [
  ...siemreapDestinations,
  ...phnompenhDestinations,
  ...kampotDestinations,
  ...kepDestinations,
  ...battambangDestinations,
  ...sihanoukvilleDestinations,
  ...kohkongDestinations,
  ...mondulkiriDestinations,
  ...pailinDestinations,
  ...ratanakiriDestinations
];

export default function DestinationDetail({ destination: initialDestination }) {
  const router = useRouter();
  const [destination, setDestination] = useState(initialDestination);
  const [user, setUser] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      
      // Sync from server for latest favorites/ratings
      fetch('/api/auth/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userData.email })
      })
      .then(res => res.json())
      .then(data => {
        if (!data.message) {
          setIsFavorite(data.favorites?.includes(initialDestination?.id));
          setUserRating(data.ratings?.[initialDestination?.id] || 0);
          localStorage.setItem("currentUser", JSON.stringify(data));
        }
      });
    }
  }, [initialDestination?.id]);

  const toggleFavorite = async () => {
    if (!user) return router.push('/signin');
    
    const newStatus = !isFavorite;
    setIsFavorite(newStatus);

    try {
      const res = await fetch('/api/user/favorite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, destinationId: destination.id })
      });
      const data = await res.json();
      if (data.favorites) {
        setIsFavorite(data.favorites.includes(destination.id));
        // Update local session
        const updatedUser = { ...user, favorites: data.favorites };
        setUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      setIsFavorite(!newStatus);
    }
  };

  const handleRate = async (rating) => {
    if (!user) return router.push('/signin');
    if (isSubmitting) return;

    setIsSubmitting(true);
    setUserRating(rating);

    try {
      const res = await fetch('/api/user/rate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, destinationId: destination.id, rating })
      });
      const data = await res.json();
      if (data.newAverage) {
        setDestination({ ...destination, rating: data.newAverage });
      }
      if (data.userRating) {
        // Update local session
        const updatedUser = { ...user };
        if (!updatedUser.ratings) updatedUser.ratings = {};
        updatedUser.ratings[destination.id] = data.userRating;
        setUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error("Error rating:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Destination Not Found</h1>
          <p className="text-gray-500 mb-8">The destination you're looking for doesn't exist.</p>
          <Link href="/destinations" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors shadow-lg">
            Back to Destinations
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      <Head>
        <title>{destination.name} | Tourist App</title>
        <meta name="description" content={destination.description} />
      </Head>
      
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden">
          <img 
            src={destination.images} 
            alt={destination.name}
            className="absolute inset-0 w-full h-full object-cover animate-image-reveal"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          
          <div className="absolute inset-0 flex flex-col justify-end px-8 pb-16 md:px-16 md:pb-24 max-w-7xl mx-auto space-y-6">
            <Link href="/destinations" className="group flex items-center text-white/80 hover:text-white transition-colors w-max mb-4 backdrop-blur-md bg-white/10 px-4 py-2 rounded-full border border-white/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-medium">Back to Destinations</span>
            </Link>
            
              <div className="flex justify-between items-start">
                <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-4 drop-shadow-lg">
                  {destination.name}
                </h1>
                
                <button 
                  onClick={toggleFavorite}
                  className={`p-4 rounded-2xl backdrop-blur-md border transition-all duration-300 ${
                    isFavorite 
                    ? 'bg-red-500/80 border-red-400 text-white fill-current' 
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center backdrop-blur-md bg-white/20 px-5 py-2.5 rounded-2xl border border-white/30 shadow-xl">
                  <div className="flex text-yellow-400 mr-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < Math.floor(destination.rating) ? 'fill-current' : 'text-gray-400/50 fill-current'}`} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-white font-bold text-lg">{Number(destination.rating).toFixed(1)} <span className="text-white/70 text-sm font-normal">/ 5</span></span>
                </div>
                
                {destination.duration && (
                  <div className="flex items-center text-white/90 font-medium backdrop-blur-md bg-black/30 px-5 py-2.5 rounded-2xl border border-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {destination.duration}
                  </div>
                )}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="px-8 py-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <div className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-sm border border-gray-100">
                <h2 className="text-sm font-bold tracking-widest text-blue-500 uppercase mb-4">Overview</h2>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">{destination.description}</h3>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p className="leading-relaxed text-lg">
                    {destination.fullDescription || `${destination.name} is a spectacular destination offering unforgettable experiences. Visitors will marvel at its stunning architecture and historical significance, making it a highlight of any trip to Siem Reap. Be sure to bring your camera and comfortable walking shoes as you spend hours exploring the vast grounds.`}
                  </p>
                </div>
              </div>

              {destination.highlights && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 pl-4 border-l-4 border-blue-500">Key Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {destination.highlights.map((highlight, index) => (
                      <div key={index} className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-start">
                        <div className="bg-blue-50 text-blue-500 w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 mr-5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-lg font-bold text-gray-800 mt-2.5">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2.5rem] p-10 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                <h3 className="text-2xl font-bold mb-4 relative z-10">Plan Your Visit</h3>
                <p className="text-blue-100 mb-8 relative z-10">Get the most out of your trip to {destination.name}. Book experiences and guides.</p>
                <button className="w-full py-4 px-6 bg-white text-blue-600 font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all relative z-10 focus:ring-4 focus:ring-white/30">
                  Book a Guide Open
                </button>
              </div>

               <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Your Experience</h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRate(star)}
                          className={`transition-all duration-200 ${star <= userRating ? 'text-yellow-400 scale-110' : 'text-gray-300 hover:text-yellow-200 cursor-pointer'}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      ))}
                    </div>
                    <p className="text-sm font-medium text-gray-500">
                      {userRating > 0 ? `You rated this ${userRating} stars` : "Rate this destination"}
                    </p>
                  </div>
               </div>

               <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
                 <h3 className="text-xl font-bold text-gray-900 mb-6">Practical Info</h3>
                 <ul className="space-y-6">
                   <li className="flex items-start">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mr-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                     <div>
                       <span className="block font-bold text-gray-900">Best time to go</span>
                       <span className="text-gray-500">Early morning or late afternoon</span>
                     </div>
                   </li>
                   <li className="flex items-start">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mr-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                     </svg>
                     <div>
                       <span className="block font-bold text-gray-900">Dress Code</span>
                       <span className="text-gray-500">Shoulders and knees covered</span>
                     </div>
                   </li>
                 </ul>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        @keyframes imageReveal {
          from { transform: scale(1.1); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-image-reveal {
          animation: imageReveal 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .animate-fade-up {
          animation: fadeUp 1s ease-out 0.3s both;
        }
      `}</style>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = allDestinations.map((dest) => ({
    params: { id: dest.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const destination = allDestinations.find((dest) => dest.id === params.id) || null;

  return {
    props: {
      destination,
    },
  };
}
