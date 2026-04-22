import Link from "next/link";
import { useState, useEffect } from "react";

export default function Destinations() {
  const [provinces, setProvinces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch("/api/provinces");
        const data = await response.json();
        if (data && data.length > 0) {
          setProvinces(data);
        } else {
          // Fallback to static data if API returns empty
          setProvinces([
            { name: "Phnom Penh", slug: "phnompenh", image: "https://ak-d.tripcdn.com/images/0104h12000819coq5F0B1_C_670_770_R5.jpg_.webp" },
            { name: "Siem Reap", slug: "siemreap", image: "https://ak-d.tripcdn.com/images/01070120009bxreulBEAE_C_670_770_R5.jpg_.webp" },
            { name: "Sihanoukville", slug: "sihanoukville", image: "https://ak-d.tripcdn.com/images/10060t000000iabv143F7_C_400_280_R5.jpg_.webp" },
            { name: "Battambang", slug: "battambang", image: "https://ak-d.tripcdn.com/images/10010u000000jiv9aF9AF_C_880_350_R5.jpg" },
            { name: "Kampot", slug: "kampot", image: "https://ak-d.tripcdn.com/images/0100x12000827ci49F6E3_C_670_770_R5.jpg_.webp" },
            { name: "Kep", slug: "kep", image: "https://ak-d.tripcdn.com/images/0106c1200086ajf714B27_C_670_770_R5.jpg_.webp" },
            { name: "Koh Kong", slug: "kohkong", image: "https://ak-d.tripcdn.com/images/0ww4n12000ddxqupz4ED5_D_500_500_R5_Q80.webp" },
            { name: "Mondulkiri", slug: "mondulkiri", image: "https://ak-d.tripcdn.com/images/0HJ0612000haqp5yx408F_D_500_500_R5_Q80.webp" },
            { name: "Pailin", slug: "pailin", image: "https://ak-d.tripcdn.com/images/0HJ5212000gx9fjfsBCA4_C_300_225_R5.jpg_.webp" },
            { name: "Ratanakiri", slug: "ratanakiri", image: "https://ak-d.tripcdn.com/images/0HJ4112000hcgoilv331B_D_500_500_R5_Q80.webp" },
          ]);
        }
      } catch (error) {
        console.error("Error fetching provinces:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  return (
    <section className="px-8 py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-blue-900 mb-4">Explore Destinations</h1>
          <p className="text-gray-500 text-lg">Discover the beauty and culture across Cambodia's provinces</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {isLoading ? (
            [...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-100 h-80 rounded-3xl animate-pulse"></div>
            ))
          ) : provinces.map((province) => (
            <Link href={province.href || `/${province.slug}`} key={province.id || province.slug}>
              <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-gray-100">
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={province.image}
                    alt={province.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-500 transition-colors">
                    {province.name}
                  </h2>
                  <div className="flex items-center mt-3 text-blue-400 font-semibold group-hover:translate-x-2 transition-transform">
                    <span>View Attractions</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
