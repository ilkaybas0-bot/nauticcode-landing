const fs = require('fs');
const path = require('path');

function walkAndReplace(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    
    // node_modules, .next, .git gibi klasörleri atla
    if (['node_modules', '.next', '.git'].includes(file)) return;

    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkAndReplace(fullPath);
    } else if (stat.isFile()) {
      try {
        let content = fs.readFileSync(fullPath, 'utf8');
        let updated = content
          .replace(/Mogens Software/g, 'Mogens Software')
          .replace(/mogens/g, 'mogens');

        if (content !== updated) {
          fs.writeFileSync(fullPath, updated, 'utf8');
          console.log(`Güncellendi: ${fullPath}`);
        }
      } catch (err) {
        // Okunamayan binary dosyaları geç
      }
    }
  });
}

walkAndReplace('./');
console.log('Tüm marka güncellemesi başarıyla tamamlandı!');