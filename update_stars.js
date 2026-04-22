const fs = require('fs');
const path = require('path');

const provincesDir = path.join(__dirname, 'src', 'components', 'provinces');
const files = fs.readdirSync(provincesDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(provincesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Random float between 4.2 and 4.9 for realistic ratings
  const getRandomRating = () => (Math.floor(Math.random() * 8) + 42) / 10;
  const provinceRating = getRandomRating().toFixed(1);

  // 1. Add ratings to the destinations array objects
  // We match description: "..." and append rating: X.X
  content = content.replace(/(description:\s*".*?")/g, (match) => {
    // If it already has a rating, don't double add
    if (content.includes('rating:')) return match; 
    return `${match},\n      rating: ${getRandomRating().toFixed(1)}`;
  });

  // 1b. Since the script might match broadly, let's use a safer regex:
  // We'll split the content, replace, and join. Or better, just do it on the specific objects
  
  const destRegex = /name:\s*"(.*?)",\n\s*images:\s*"(.*?)",\n\s*description:\s*"(.*?)"/g;
  content = content.replace(destRegex, (match, name, images, description) => {
    return `name: "${name}",\n      images: "${images}",\n      description: "${description}",\n      rating: ${getRandomRating().toFixed(1)}`;
  });

  // 2. Add stars to the Top Destinations Card
  const cardH4Regex = /<h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-500 transition-colors">\s*\{item\.name\}\s*<\/h4>/;
  
  const cardStarsReplacement = `<h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-500 transition-colors">
                    {item.name}
                  </h4>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className={\`h-4 w-4 \${i < Math.floor(item.rating || 5) ? 'text-yellow-400' : 'text-gray-300'}\`} viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-500 text-sm font-medium ml-2">{item.rating || 5}.0 / 5</span>
                  </div>`;
  
  content = content.replace(cardH4Regex, cardStarsReplacement);


  // 3. Add province rating to the Hero Section
  // Find the h1
  const h1Regex = /<h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tighter">(.*?)<\/h1>/;
  const h1StarsReplacement = `<h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tighter">$1</h1>
            <div className="flex items-center mb-6">
              <div className="flex text-yellow-500 drop-shadow-md">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className={\`h-7 w-7 \${i < Math.floor(${provinceRating}) ? 'text-yellow-400' : 'text-gray-400/50'}\`} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-white text-lg font-bold ml-4 backdrop-blur-md bg-white/20 px-4 py-1.5 rounded-full border border-white/30 shadow-lg">${provinceRating} / 5</span>
            </div>`;
            
  content = content.replace(h1Regex, h1StarsReplacement);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated:', file);
});
