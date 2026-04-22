import Link from "next/link";

export default function Footer() {
  const socialIcons = [
    { 
      name: "Facebook", 
      link: "#",
      color: "#1877F2",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
        </svg>
      )
    },
    { 
      name: "YouTube", 
      link: "#",
      color: "#FF0000",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505a3.017 3.017 0 0 0-2.122 2.136C0 8.055 0 12 0 12s0 3.945.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.945 24 12 24 12s0-3.945-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    { 
      name: "Instagram", 
      link: "#",
      color: "#E4405F",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.063-2.633-.333-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058-1.646-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.053.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.353 2.615 6.768 6.98 6.968 1.28.058 1.688.072 4.948.072s3.667-.014 4.947-.072c4.353-.2 6.768-2.615 6.968-6.98.058-1.28.072-1.688.072-4.948s-.014-3.667-.072-4.947c-.2-4.353-2.615-6.768-6.968-6.968C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      )
    },
  ];

  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Logo and About Description */}
          <div className="col-span-1 md:col-span-1 border-r border-gray-50 pr-8">
            <h1 className="text-3xl font-black text-blue-500 mb-6 tracking-tighter italic">Tourist</h1>
            <p className="text-gray-500 leading-relaxed mb-8 font-medium">
              Explore the hidden gems and majestic wonders of Cambodia. 
              Your ultimate guide to an unforgettable travel experience.
            </p>
            <div className="flex gap-5">
              {socialIcons.map((social) => (
                <a 
                  key={social.name} 
                  href={social.link} 
                  style={{ color: social.color }}
                  className="hover:scale-125 transition-all duration-300 transform-gpu"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* About Links */}
          <div>
            <h2 className="text-gray-800 font-bold text-lg mb-6 tracking-tight">About</h2>
            <ul className="space-y-4">
              <li>
                <Link href="/about-us" className="text-gray-500 hover:text-blue-400 font-medium transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-gray-500 hover:text-blue-400 font-medium transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/activity" className="text-gray-500 hover:text-blue-400 font-medium transition-colors">
                  Activities
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us Links */}
          <div>
            <h2 className="text-gray-800 font-bold text-lg mb-6 tracking-tight">Contact Us</h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-500 font-medium cursor-default hover:text-blue-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@tourist.com
              </li>
              <li className="flex items-center gap-3 text-gray-500 font-medium cursor-default hover:text-blue-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +855 12 345 678
              </li>
              <li className="flex items-center gap-3 text-gray-500 font-medium cursor-default hover:text-blue-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Phnom Penh, Cambodia
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h2 className="text-gray-800 font-bold text-lg mb-6 tracking-tight">Subscribe</h2>
            <p className="text-gray-500 text-sm mb-4 font-medium">Get the latest travel news and deals.</p>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Email address" 
                className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-300 transition-all flex-1 text-black"
              />
              <button className="bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-xl transition-all active:scale-95 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-gray-50 text-center">
          <p className="text-gray-400 text-sm font-medium">
            © 2026 Tourist Cambodia. All rights reserved. Made by teamwork ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}
