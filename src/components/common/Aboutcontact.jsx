import Link from "next/link";

export default function Aboutcontact() {
  const suggestions = [
    {
      name: "Yey Yat Shrine",
      image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1920&auto=format&fit=crop",
      description: "A sacred Buddhist shrine with beautiful architecture and peaceful surroundings."
    },
    {
      name: "Phnom Khiev Waterfall",
      image: "https://images.unsplash.com/photo-1559592413-7cea7393e87d?q=80&w=1000&auto=format&fit=crop",
      description: "A stunning natural waterfall perfect for nature lovers and photographers."
    },
    {
      name: "Yat Mountain",
      image: "https://images.unsplash.com/photo-1596402184320-417d7178b2cd?q=80&w=1000&auto=format&fit=crop",
      description: "Enjoy panoramic views of the province from the top of this majestic mountain."
    },
    {
      name: "Kids Park",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&h=400&auto=format&fit=crop",
      description: "A fun and safe place for children to play and enjoy outdoor activities."
    },
  ];

  return (
    <section className="px-8 py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="relative h-96 rounded-[3rem] overflow-hidden mb-24 shadow-2xl group">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1920&auto=format&fit=crop"
            alt="Cambodia Travel"
            className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-16">
            <h1 className="text-6xl font-bold text-white mb-4 tracking-tighter">About Us</h1>
            <p className="text-blue-100 text-xl max-w-lg font-medium">Discover our mission to showcase the hidden wonders of Cambodia.</p>
          </div>
        </div>

        {/* Information / Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32 items-center">
          <div>
            <h2 className="text-4xl font-bold text-blue-900 mb-8 tracking-tight">Promoting Cambodia’s Heritage</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              The Tourist Website of Cambodia is an online platform designed to
              promote Cambodia’s rich culture, natural beauty, and historical heritage
              to travelers around the world.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              We provide detailed information about popular destinations such as Angkor Wat, 
              Phnom Penh, Sihanoukville, Battambang, and Siem Reap, along with hidden 
              gems across the country. Our goal is to make your travel experience 
              unforgettable and seamless.
            </p>
          </div>
          <div className="relative h-[400px] rounded-[2.5rem] overflow-hidden shadow-xl border-8 border-gray-50/50">
             <img 
               src="https://images.unsplash.com/photo-1559592413-7cea7393e87d?q=80&w=1000&auto=format&fit=crop" 
               alt="Info" 
               className="w-full h-full object-cover"
             />
          </div>
        </div>

        {/* Suggestions Section */}
        <div className="mb-32">
          <div className="mb-12 text-center">
             <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Our Top Suggestions</h2>
             <p className="text-gray-500 text-lg">Curated activities to enhance your Cambodian adventure</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {suggestions.map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-[2rem] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group cursor-pointer border border-gray-100 flex flex-col h-full"
              >
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-500 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                    {item.description}
                  </p>
                  <div className="flex items-center text-blue-500 font-bold group-hover:translate-x-2 transition-transform select-none">
                    <span>Explore More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Social Section */}
        <div className="bg-blue-50/50 rounded-[3rem] p-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border border-blue-100/50 shadow-inner">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">Get in Touch</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-md italic">
              "We'd love to hear from you. Follow our journey or reach out for inquiries."
            </p>
            <div className="space-y-6">
               <ContactInfo icon="mail" label="info@tourist.com" />
               <ContactInfo icon="phone" label="+855 12 345 678" />
               <ContactInfo icon="map-pin" label="Phnom Penh, Cambodia" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Follow Us On</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <SocialCard icon="facebook" label="Facebook" color="bg-blue-600" />
              <SocialCard icon="telegram" label="Telegram" color="bg-sky-500" />
              <SocialCard icon="instagram" label="Instagram" color="bg-pink-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactInfo({ icon, label }) {
  const icons = {
    mail: <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    phone: <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
    "map-pin": <><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></>
  };
  return (
    <div className="flex items-center gap-4 group">
      <div className="p-3 bg-white rounded-xl shadow-sm border border-blue-100 group-hover:bg-blue-500 group-hover:text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          {icons[icon]}
        </svg>
      </div>
      <span className="text-gray-700 font-semibold">{label}</span>
    </div>
  );
}

function SocialCard({ icon, label, color }) {
  const icons = {
    facebook: "https://ak-d.tripcdn.com/images/05E2j12000cjsihpq0418.png",
    telegram: "https://ak-d.tripcdn.com/images/05E2z12000cjsfsqb7A2B.png",
    instagram: "https://ak-d.tripcdn.com/images/05E5k12000cjsg4e48D91.png",
  };
  return (
    <a href="#" className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
      <div className={`p-4 rounded-2xl ${color} bg-opacity-10 group-hover:bg-opacity-100 transition-all duration-300 mb-4`}>
        <img src={icons[icon]} alt={label} className="h-8 w-8 group-hover:brightness-0 group-hover:invert transition-all" />
      </div>
      <span className="font-bold text-gray-800">{label}</span>
    </a>
  );
}
