const fs = require('fs');
const path = require('path');

// Highly relevant, colorful Pexels images for each page of the luxury chauffeur website
// All are direct CDN URLs (images.pexels.com) - free and embeddable with no API required
const imageMap = {
  // HOME page - black luxury Mercedes/BMW in a city setting
  home: {
    file: 'app/page.tsx',
    oldSrc: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    newSrc: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Royston Lynxx Luxury Chauffeur Fleet'
  },
  // ABOUT page - professional chauffeur team / luxury fleet lineup
  about: {
    file: 'app/about/page.tsx',
    oldSrc: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80',
    newSrc: 'https://images.pexels.com/photos/248747/pexels-photo-248747.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Royston Lynxx Professional Chauffeur Team'
  },
  // CONTACT page - UK city / London skyline with luxury car
  contact: {
    file: 'app/contact/page.tsx',
    oldSrc: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80',
    newSrc: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Contact Royston Lynxx - UK Chauffeur Service'
  },
  // RIDE WITH US - professional driver in suit holding keys
  rideWithUs: {
    file: 'app/ride-with-us/page.tsx',
    oldSrc: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80',
    newSrc: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Become a Royston Lynxx Chauffeur Driver'
  },
  // AIRPORT TRANSFERS - busy international airport terminal
  airportTransfers: {
    file: 'app/services/airport-transfers/page.tsx',
    oldSrc: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80',
    newSrc: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Airport Transfer Service - Heathrow Gatwick Luton'
  },
  // EXECUTIVE TRAVEL - sleek black luxury sedan interior
  executiveTravel: {
    file: 'app/services/executive-travel/page.tsx',
    oldSrc: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80',
    newSrc: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Executive Business Travel - Royston Lynxx'
  },
  // SEAPORT TRANSFERS - cruise ship at a port
  seaportTransfers: {
    file: 'app/services/seaport-transfers/page.tsx',
    oldSrc: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=600&q=80',
    newSrc: 'https://images.pexels.com/photos/1577445/pexels-photo-1577445.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Seaport & Cruise Terminal Transfer Service'
  },
  // LONG DISTANCE - open highway / road ahead through beautiful countryside
  longDistance: {
    file: 'app/services/long-distance/page.tsx',
    oldSrc: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=600&q=80',
    newSrc: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Long Distance UK Travel - Royston Lynxx'
  }
};

let updatedCount = 0;

for (const [key, imageData] of Object.entries(imageMap)) {
  const fullPath = path.join(__dirname, imageData.file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    if (content.includes(imageData.oldSrc)) {
      content = content.replace(new RegExp(imageData.oldSrc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), imageData.newSrc);
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ Updated ${key}: ${imageData.file}`);
      updatedCount++;
    } else {
      console.log(`⚠️  Old URL not found in ${imageData.file} for ${key}`);
    }
  } else {
    console.log(`❌ File not found: ${imageData.file}`);
  }
}

console.log(`\nDone! Updated ${updatedCount} images.`);
