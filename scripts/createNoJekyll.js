// scripts/createNoJekyll.js
import fs from 'fs';
import path from 'path';
const outDir = path.join(process.cwd(), 'out');
const noJekyllPath = path.join(outDir, '.nojekyll');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(noJekyllPath, '');
console.log('✅ .nojekyll created in "out" directory');