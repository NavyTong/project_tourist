import React from "react";
import Link from "next/link";
import { pailinDestinations } from "@/data/pailin-destinations";

export default function Pailin() {
  const destinations = pailinDestinations;

  return (
    <section className="px-8 py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="relative h-[450px] rounded-[3rem] overflow-hidden mb-24 shadow-2xl group">
          <img
            src="https://ak-d.tripcdn.com/images/01070120009bxreulBEAE_C_880_350_R5.jpg"
            alt="Pailin Hero"
            className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-16">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tighter">Pailin</h1>
            <div className="flex items-center mb-6">
              <div className="flex text-yellow-500 drop-shadow-md">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7 ${i < Math.floor(4.6) ? 'text-yellow-400' : 'text-gray-400/50'}`} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-white text-lg font-bold ml-4 backdrop-blur-md bg-white/20 px-4 py-1.5 rounded-full border border-white/30 shadow-lg">4.6 / 5</span>
            </div>
            <p className="text-blue-100 text-2xl max-w-lg font-medium italic">"The City of Gems."</p>
          </div>
        </div>

        {/* Province Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32 items-center">
          <div>
            <h2 className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-4">Western Frontier</h2>
            <h3 className="text-5xl font-bold text-blue-900 mb-8 tracking-tight">Rubies and Cardamom Mountains</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Located on the border with Thailand, Pailin was historically famous 
              for its vast deposits of precious gems, particularly rubies and sapphires, 
              which drew fortune seekers from all over Southeast Asia.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Today, while the gem rush has slowed, Pailin offers rugged beauty. 
              Surrounded by the dense foothills of the Cardamom Mountains, it features 
              cool waterfalls, mysterious hilltop shrines, and a unique border-town atmosphere.
            </p>
          </div>
          <div className="relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-gray-50/50">
             <img 
               src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Phnom_Yat.jpg/1280px-Phnom_Yat.jpg" 
               alt="Overview" 
               className="w-full h-full object-cover"
             />
          </div>
        </div>

        {/* Top Destinations */}
        <div className="mb-32">
          <div className="mb-16 text-center">
             <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Top Destinations</h2>
             <p className="text-gray-500 text-lg">Must-visit sites in and around Pailin</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map((item) => (
              <Link
                key={item.id}
                href={`/details/${item.id}`}
                className="bg-white rounded-[2rem] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group cursor-pointer border border-gray-100 flex flex-col h-full"
              >
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={item.images}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-500 transition-colors">
                    {item.name}
                  </h4>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < Math.floor(item.rating || 5) ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-500 text-sm font-medium ml-2">{Number(item.rating || 5).toFixed(1)} / 5</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                    {item.description}
                  </p>
                  <div className="flex items-center text-blue-500 font-bold group-hover:translate-x-2 transition-transform select-none">
                    <span>Explore</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Practical Information */}
        <div className="bg-gray-50 rounded-[4rem] p-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center border border-gray-100">
           <InfoCard 
             icon="calendar" 
             title="Best Time to Visit" 
             text="November to March is ideal for comfortable temperatures." 
           />
           <InfoCard 
             icon="ticket" 
             title="Gem Markets" 
             text="Be cautious when buying gems unless you are an expert." 
           />
           <InfoCard 
             icon="truck" 
             title="Getting Around" 
             text="Motodops and rented scooters are best for local exploration." 
           />
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, title, text }) {
  const icons = {
    calendar: <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    ticket: <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />,
    truck: <><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></>
  };
  return (
    <div className="group">
      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-500 mx-auto mb-6 shadow-sm group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {icons[icon]}
        </svg>
      </div>
      <h4 className="text-2xl font-bold text-gray-900 mb-3">{title}</h4>
      <p className="text-gray-500 font-medium">{text}</p>
    </div>
  );
}
