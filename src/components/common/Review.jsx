export default function kohkong() {
  const destinations = [
    {
      name: "Yey Yat Shrine",
      image:
        "https://ak-d.tripcdn.com/images/0HJ5212000gx9fjfsBCA4_C_300_225_R5.jpg_.webp",
    },
    {
      name: "Phnom Khiev Waterfall",
      image:
        "https://ak-d.tripcdn.com/images/100k1f000001gmepl39E3_C_300_225_R5.jpg_.webp",
    },
    {
      name: "Yat Mountain",
      image:
        "https://ak-d.tripcdn.com/images/0HJ6v12000isyyrdp4CD9_C_300_225_R5.jpg_.webp",
    },
    {
      name: "Kids Park ",
      image:
        "https://ak-d.tripcdn.com/images/0HJ3q12000iorl13a73C3_D_500_500_R5_Q80.webp?proc=source/trip&_fr=wc",
    },
    {
      name: "Ochra Pagoda",
      image:
        "https://ak-d.tripcdn.com/images/0HJ3v12000i9nzwlhCE8B_D_500_500_R5_Q80.webp?proc=source/trip&_fr=wc",
    },
  ];

  return (
    <section className="px-8 py-12">
      {/* Hero Section */}
      <div className="relative h-72 rounded-3xl overflow-hidden mb-12">
        <img
          src="https://ak-d.tripcdn.com/images/01070120009bxreulBEAE_C_880_350_R5.jpg"
          alt="Siem Reap"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-8">
          <h1 className="text-4xl font-bold text-white">
            Review Place Form Tourist
          </h1>
          <p className="text-gray-200 mt-2">Let’s enjoy this heaven on earth</p>
        </div>
      </div>
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-900">Review Place</h1>
        <p className="text-gray-400 mt-2">Let’s enjoy this heaven on earth</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((place) => (
          <div
            key={place.name}
            className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition group bg-white"
          >
            <div className="h-60 overflow-hidden">
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {place.name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
