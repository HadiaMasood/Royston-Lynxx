const fs = require('fs');
const path = require('path');

const files = [
  'app/page.tsx',
  'app/contact/page.tsx',
  'app/ride-with-us/page.tsx',
  'app/services/airport-transfers/page.tsx',
  'app/services/seaport-transfers/page.tsx',
  'app/services/executive-travel/page.tsx',
  'app/services/long-distance/page.tsx',
];

let totalFixed = 0;

files.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace footer brand: Quick<span className="text-gold">Hop</span>
    // with: Royston <span className="text-gold">Lynxx</span>
    const oldBrand = 'Quick<span className="text-gold">Hop</span>';
    const newBrand = 'Royston <span className="text-gold">Lynxx</span>';
    
    const count = (content.match(new RegExp(oldBrand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
    
    if (count > 0) {
      content = content.replace(new RegExp(oldBrand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newBrand);
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ Fixed ${count}x in ${file}`);
      totalFixed += count;
    } else {
      console.log(`⏭️  Already correct in ${file}`);
    }
  }
});

console.log(`\nDone! Fixed ${totalFixed} QuickHop → Royston Lynxx replacements.`);
