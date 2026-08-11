const fs = require('fs');
const path = require('path');

// 4. Ride with us Page
const ridePath = path.join(__dirname, 'app/ride-with-us/page.tsx');
if (fs.existsSync(ridePath)) {
  let content = fs.readFileSync(ridePath, 'utf8');
  
  // Use regex to match list item and closing tags regardless of CRLF or spaces
  const regex = /<li className="flex items-start gap-2\.5">\s*<span className="text-gold font-bold mt-0\.5">✔<\/span>\s*<span><strong>Professional Attitude:<\/strong> Uniformed dress-code \(suit and tie\) is mandatory for all executive chauffeur client journeys\.<\/span>\s*<\/li>\s*<\/ul>\s*<\/div>/;
  
  if (regex.test(content) && !content.includes('Professional Chauffeur')) {
    const replacement = `<li className="flex items-start gap-2.5">
                  <span className="text-gold font-bold mt-0.5">✔</span>
                  <span><strong>Professional Attitude:</strong> Uniformed dress-code (suit and tie) is mandatory for all executive chauffeur client journeys.</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#121215] rounded-3xl border border-zinc-800/80 overflow-hidden h-44 relative group shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80" 
                alt="Professional Chauffeur"
                className="w-full h-full object-cover filter grayscale contrast-125 opacity-40 group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121215] to-transparent" />
            </div>`;
    
    content = content.replace(regex, replacement);
    fs.writeFileSync(ridePath, content, 'utf8');
    console.log(`Updated ride-with-us page using regex`);
  } else {
    console.log(`Pattern not found or already updated in ride-with-us page`);
  }
}
