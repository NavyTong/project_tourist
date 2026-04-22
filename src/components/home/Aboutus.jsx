export default function Aboutus() {
  const values = [
    {
      title: "Sustainability",
      icon: <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
      description: "Preserving the beauty of Cambodia for generations to come."
    },
    {
      title: "Community",
      icon: <path d="M12 4.354l1.1 3.383h3.558l-2.877 2.09 1.1 3.383-2.881-2.09-2.881 2.09 1.1-3.383-2.877-2.09h3.558L12 4.354z" />,
      description: "Supporting local guides and businesses across the kingdom."
    },
    {
      title: "Integrity",
      icon: <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
      description: "Providing honest, expert advice for every traveler."
    }
  ];

  return (
    <section className="px-8 py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="relative h-[450px] rounded-[3rem] overflow-hidden mb-24 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1920&auto=format&fit=crop"
            alt="About Us Hero"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-8">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tighter">Our Journey</h1>
            <p className="text-blue-100 text-2xl max-w-2xl font-medium italic">"Connecting the world to the heart of Cambodia."</p>
          </div>
        </div>

        {/* Who We Are Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32 items-center">
          <div className="order-2 lg:order-1 relative h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl group">
             <img 
               src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1000&auto=format&fit=crop" 
               alt="Our Culture" 
               className="w-full h-full object-cover group-hover:scale-110 transition duration-1000"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-4">Discovery & Passion</h2>
            <h3 className="text-5xl font-bold text-blue-900 mb-8 tracking-tight leading-tight">Authentic Travels <br/>Since 2018</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Tourist Cambodia was born from a simple passion: to share the untold stories 
              and hidden gems of our beautiful kingdom with the world. We believe that 
              travel is more than just seeing places—it's about connecting with 
              people, culture, and nature.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our team of local experts and travel enthusiasts works tirelessly to curate 
              the most authentic experiences, from the majestic sunrise at Angkor Wat 
              to the white sands of Kep. We are dedicated to providing you with the 
              inspiration and tools to create your own Cambodian adventure.
            </p>
          </div>
        </div>

        {/* Mission & Values Grid */}
        <div className="mb-32 py-24 bg-blue-50 rounded-[4rem] px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Our Core Values</h2>
            <p className="text-gray-500 text-lg">What drives us every single day</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {values.map((value) => (
              <div key={value.title} className="p-8 bg-white rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-500 mx-auto mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    {value.icon}
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h4>
                <p className="text-gray-500 leading-relaxed font-medium">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final Vision Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h3 className="text-4xl font-bold text-blue-900 mb-8 tracking-tight">One Kingdom, One Adventure</h3>
          <p className="text-gray-500 text-xl leading-relaxed italic mb-12">
            "Our vision is to be the ultimate companion for every traveler seeking to 
            know the real Cambodia. Join us as we explore the heart and soul 
            of the kingdom."
          </p>
          <div className="flex justify-center gap-6">
             <div className="h-1 w-24 bg-blue-400 rounded-full"></div>
             <div className="h-1 w-8 bg-blue-200 rounded-full"></div>
             <div className="h-1 w-24 bg-blue-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
