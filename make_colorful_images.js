const fs = require('fs');
const path = require('path');

// 1. Home Page image insertion
const homePath = path.join(__dirname, 'app/page.tsx');
if (fs.existsSync(homePath)) {
  let content = fs.readFileSync(homePath, 'utf8');
  
  const targetText = `<p className="text-base text-zinc-300 leading-relaxed max-w-lg">
              Enjoy fixed, competitive rates and dynamic, custom-tailored fleets. We specialise in taxi transfers to and from London Heathrow, Gatwick, Luton, Southampton Airport, and Southampton Cruise Terminal.
            </p>`;
            
  if (content.includes(targetText) && !content.includes('Royston Lynxx Premium Chauffeur Fleet')) {
    const replacement = `<p className="text-base text-zinc-300 leading-relaxed max-w-lg">
              Enjoy fixed, competitive rates and dynamic, custom-tailored fleets. We specialise in taxi transfers to and from London Heathrow, Gatwick, Luton, Southampton Airport, and Southampton Cruise Terminal.
            </p>
            
            <div className="w-full h-48 rounded-3xl overflow-hidden border border-zinc-800 shadow-xl relative group my-4">
              <img 
                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80" 
                alt="Royston Lynxx Premium Chauffeur Fleet"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>`;
    content = content.replace(targetText, replacement);
    fs.writeFileSync(homePath, content, 'utf8');
    console.log('Updated Home page with colorful hero image');
  }
}

// 2. Services, About, Contact, Ride With Us pages - Remove grayscale/dark filters to make them colorful
const filesToUpdate = [
  'app/services/airport-transfers/page.tsx',
  'app/services/seaport-transfers/page.tsx',
  'app/services/executive-travel/page.tsx',
  'app/services/long-distance/page.tsx',
  'app/about/page.tsx',
  'app/contact/page.tsx',
  'app/ride-with-us/page.tsx'
];

filesToUpdate.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    let updated = false;

    // Remove grayscale and brightness filters from images
    const grayscaleRegex = /className="w-full h-full object-cover filter brightness-90 grayscale contrast-125 hover:grayscale-0 transition duration-500"/g;
    if (grayscaleRegex.test(content)) {
      content = content.replace(grayscaleRegex, 'className="w-full h-full object-cover group-hover:scale-105 transition duration-500"');
      updated = true;
    }

    // Update map/checklists placeholders too (removing opacity and grayscale)
    const mapRegex = /className="w-full h-full object-cover filter grayscale contrast-125 opacity-40 group-hover:scale-105 transition duration-500"/g;
    if (mapRegex.test(content)) {
      content = content.replace(mapRegex, 'className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-500"');
      updated = true;
    }

    // Specific change for ride-with-us image URL (using a more colorful, professional driver image)
    if (file === 'app/ride-with-us/page.tsx' && content.includes('photo-1549399542-7e3f8b79c341')) {
      content = content.replace('photo-1549399542-7e3f8b79c341', 'photo-1563720223185-11003d516935');
      updated = true;
    }

    // Specific change for about page image URL (using a more colorful luxury car interior)
    if (file === 'app/about/page.tsx' && content.includes('photo-1494976388531-d1058494cdd8')) {
      content = content.replace('photo-1494976388531-d1058494cdd8', 'photo-1449965408869-eaa3f722e40d');
      updated = true;
    }

    if (updated) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Updated ${file} to use colorful images`);
    }
  }
});
