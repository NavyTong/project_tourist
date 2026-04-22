import Link from "next/link";
import { destinationsData } from "./data/destinationsData";

export default function DetailCard({ destination, slug }) {
  // If slug is provided, merge with destinationsData
  const data = slug ? { ...destination, ...destinationsData[slug] } : destination;
  
  if (!data) return null;

  const {
    name,
    image,
    rating = 4.5,
    tags = ["Nature", "Explore"],
    title = "Experience the beauty of Cambodia",
    slug: cardSlug
  } = data;

  const finalSlug = slug || cardSlug;

  return (
    <Link href={`/details/${finalSlug}`}>
      <div className="group relative bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 flex flex-col h-full">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Tags */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {tags.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-full border border-white/30"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Save Icon (Visual Only) */}
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 text-white hover:bg-white hover:text-red-500 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-500 transition-colors duration-300">
              {name}
            </h2>
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-bold text-yellow-700">{rating}</span>
            </div>
          </div>
          
          <p className="text-gray-500 text-sm line-clamp-2 mb-6 flex-grow">
            {title}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-blue-500 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              Explore Now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
