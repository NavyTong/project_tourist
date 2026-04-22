const fs = require('fs');
const path = require('path');

// Mocking the imports since we can't easily run ESM in a simple node script without setup
// I will instead manually construct a core set of data or read the files as text and parse them
// But wait, I can just use the tool to read the files and I will construct the JSON.

const provinces = [
  { id: 1, name: "Siem Reap", href: "/siemreap", image: "https://ak-d.tripcdn.com/images/01070120009bxreulBEAE_C_670_770_R5.jpg_.webp" },
  { id: 2, name: "Phnom Penh", href: "/phnompenh", image: "https://ak-d.tripcdn.com/images/0104h12000819coq5F0B1_C_670_770_R5.jpg_.webp" },
  { id: 3, name: "Kampot", href: "/kampot", image: "https://ak-d.tripcdn.com/images/0100x12000827ci49F6E3_C_670_770_R5.jpg_.webp" },
  { id: 4, name: "Kep", href: "/kep", image: "https://ak-d.tripcdn.com/images/0106c1200086ajf714B27_C_670_770_R5.jpg_.webp" },
  { id: 5, name: "Battambang", href: "/battambang", image: "https://ak-d.tripcdn.com/images/0HJ4g12000iontwraDD07_C_880_350_R5.jpg?proc=source%2ftrip" },
  { id: 6, name: "Sihanoukville", href: "/sihanoukville", image: "https://ak-d.tripcdn.com/images/10060t000000iabv143F7_C_400_280_R5.jpg_.webp" },
  { id: 7, name: "Koh Kong", href: "/kohkong", image: "https://youimg1.tripcdn.com/target/0103o12000agse4tu95C3_C_400_280_R5.jpg_.webp" },
  { id: 8, name: "Mondulkiri", href: "/mondulkiri", image: "https://ak-d.tripcdn.com/images/10080z000000njtpw1117_C_400_280_R5.jpg_.webp" },
  { id: 9, name: "Pailin", href: "/pailin", image: "https://ak-d.tripcdn.com/images/0HJ2512000hag11j33758_C_400_280_R5.jpg_.webp" },
  { id: 10, name: "Ratanakiri", href: "/ratanakiri", image: "https://ak-d.tripcdn.com/images/0HJ4112000hcgoilv331B_C_880_350_R5.jpg" }
];

const activities = [
  { id: 1, name: "Yey Yat Shrine", image: "https://ak-d.tripcdn.com/images/0HJ5212000gx9fjfsBCA4_C_300_225_R5.jpg_.webp", description: "A sacred Buddhist shrine...", category: "Adventure" },
  { id: 2, name: "Phnom Khiev Waterfall", image: "https://ak-d.tripcdn.com/images/100k1f000001gmepl39E3_C_300_225_R5.jpg_.webp", description: "A stunning natural waterfall...", category: "Adventure" },
  { id: 5, name: "Mahob Khmer Cuisine", image: "https://ak-d.tripcdn.com/images/100r0z000000ne3hb0178_C_300_225_R5.jpg_.webp", description: "Authentic Cambodian flavors...", category: "Gastronomy" },
  { id: 9, name: "Angkor Wat Sunrise", image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1920&auto=format&fit=crop", description: "Witness the breathtaking sunrise...", category: "Heritage" }
];

const destinations = [
  { id: "angkor-wat", name: "Angkor Wat", province: "Siem Reap", rating: 4.3, description: "The crown jewel of Cambodia..." },
  { id: "bayon-temple", name: "Bayon Temple", province: "Siem Reap", rating: 4.4, description: "Famous for its massive stone faces..." },
  { id: "ta-prohm", name: "Ta Prohm", province: "Siem Reap", rating: 4.4, description: "The 'Jungle Temple'..." }
];

const db = {
  provinces,
  activities,
  destinations
};

fs.writeFileSync(path.join(__dirname, '../src/data/db.json'), JSON.stringify(db, null, 2));
console.log('Database seeded successfully!');
