import Link from "next/link";

export default function Logosea() {
  return (
    <section className="relative w-full h-[520px] overflow-hidden rounded-2xl">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1920&auto=format&fit=crop"
        alt="Travel Destination"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center px-8 md:px-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Explore the whole world
            <br />
            <span className="text-[#0BAAF4]">and enjoy its beauty</span>
          </h1>

          <p className="mt-4 text-white/90 text-lg">
            Discover amazing places, feel the ocean breeze, and create
            unforgettable memories.
          </p>

          <Link href="/signup">
            <button className="mt-6 rounded-2xl bg-blue-500 px-8 py-4 text-white font-black shadow-xl shadow-blue-500/20 hover:bg-blue-600 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-xs">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
