const fs = require('fs');
const path = require('path');

const provincesDir = path.join(__dirname, 'src', 'components', 'provinces');
const files = fs.readdirSync(provincesDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(provincesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix 1: Remove double ratings
  // The first replacement was description: "...", rating: 4.6, \n rating: 4.7
  // We can just regex replace `rating: [\d\.]+,\s*rating:\s*[\d\.]+` with a single `rating: $1`
  // Actually, let's just match `rating: [\d\.]+,\s*rating: ([\d\.]+)`
  content = content.replace(/rating:\s*[\d\.]+,\n\s*rating:\s*([\d\.]+)/g, "rating: $1");

  // Fix 2: Fix the JSX `.0` output bug
  // Currently: <span className="text-gray-500 text-sm font-medium ml-2">{item.rating || 5}.0 / 5</span>
  // Should be: <span className="text-gray-500 text-sm font-medium ml-2">{Number(item.rating || 5).toFixed(1)} / 5</span>
  content = content.replace(/\{item\.rating \|\| 5\}\.0 \/ 5/g, "{Number(item.rating || 5).toFixed(1)} / 5");

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Cleanup complete!');
