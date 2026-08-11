const fs = require('fs');
const path = require('path');

function insertCardWrapper(content, startTag, imageHtml) {
  const startIndex = content.indexOf(startTag);
  if (startIndex === -1) return content;

  let count = 0;
  let pos = startIndex;
  let matchIndex = -1;

  while (pos < content.length) {
    const nextOpen = content.indexOf('<div', pos);
    const nextClose = content.indexOf('</div>', pos);

    if (nextClose === -1) break;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      // Check if self-closing
      const nextBracket = content.indexOf('>', nextOpen);
      if (nextBracket !== -1 && content.substring(nextBracket - 1, nextBracket + 1) === '/>') {
        // It's self closing, ignore it
        pos = nextBracket + 1;
      } else {
        count++;
        pos = nextOpen + 4;
      }
    } else {
      count--;
      if (count === 0) {
        matchIndex = nextClose;
        break;
      }
      pos = nextClose + 6;
    }
  }

  if (matchIndex !== -1) {
    const before = content.substring(0, startIndex);
    const middle = content.substring(startIndex + startTag.length, matchIndex);
    const after = content.substring(matchIndex);
    
    return before + imageHtml + middle + '</div>' + after;
  }
  return content;
}

const aboutPath = path.join(__dirname, 'app/about/page.tsx');
if (fs.existsSync(aboutPath)) {
  let content = fs.readFileSync(aboutPath, 'utf8');
  const startTag = '<div className="bg-[#121215] p-8 rounded-3xl border border-zinc-800/80 space-y-6 relative overflow-hidden">';
  
  if (content.includes(startTag) && !content.includes('filter brightness-90 grayscale')) {
    const imageHtml = `
        <div className="bg-[#121215] rounded-3xl border border-zinc-800/80 shadow-xl overflow-hidden flex flex-col relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl z-20 pointer-events-none" />
          <div className="h-48 relative w-full">
            <img 
              src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=600&q=80" 
              alt="Premium Chauffeur" 
              className="w-full h-full object-cover filter brightness-90 grayscale contrast-125 hover:grayscale-0 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121215] to-transparent" />
          </div>
          <div className="p-8 space-y-6 -mt-4 relative z-10 bg-[#121215]">`;
    
    content = insertCardWrapper(content, startTag, imageHtml);
    fs.writeFileSync(aboutPath, content, 'utf8');
    console.log(`Successfully updated about page with self-closing check`);
  } else {
    console.log(`About page already updated or pattern not found`);
  }
}
