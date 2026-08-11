const fs = require('fs');
const path = require('path');

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (file === 'page.tsx') {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // 1. Add import if not present
      if (!content.includes('MobileMenu')) {
        // Find last import statement
        const importMatch = content.match(/import .* from '.*';/g);
        if (importMatch) {
          const lastImport = importMatch[importMatch.length - 1];
          content = content.replace(lastImport, lastImport + "\nimport MobileMenu from '@/components/MobileMenu';");
          changed = true;
        }
      }

      // 2. Add MobileMenu before hidden nav
      if (content.includes('<nav className="hidden')) {
        // For app/page.tsx it's lg:flex, others md:flex. Let's just find the nav line
        const navMatches = content.match(/<nav className="hidden [^>]+>/g);
        if (navMatches && navMatches.length > 0) {
          for (const match of navMatches) {
            if (!content.includes('<MobileMenu />\n          ' + match)) {
               content = content.replace(match, '<MobileMenu />\n          ' + match);
               changed = true;
            }
          }
        }
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(path.join(__dirname, 'app'));
console.log('Done');
