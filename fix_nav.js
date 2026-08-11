const fs = require('fs');
const path = require('path');

const targetFiles = [
  'app/services/seaport-transfers/page.tsx',
  'app/services/long-distance/page.tsx',
  'app/services/executive-travel/page.tsx',
  'app/services/airport-transfers/page.tsx',
  'app/ride-with-us/page.tsx',
  'app/contact/page.tsx',
  'app/about/page.tsx'
];

targetFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    if (content.includes('hidden md:flex items-center gap-6')) {
      content = content.replace('hidden md:flex items-center gap-6', 'hidden lg:flex items-center gap-6');
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Updated ${file}`);
    } else {
      console.log(`Pattern not found in ${file}`);
    }
  } else {
    console.log(`File not found: ${file}`);
  }
});
