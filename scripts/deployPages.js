import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Initialize a temporary Git repo in 'out' and push to gh-pages
const outDir = path.join(process.cwd(), 'out');
if (!fs.existsSync(outDir)) {
  console.error('❌ out directory not found. Run build first.');
  process.exit(1);
}

try {
  // Navigate into outDir
  process.chdir(outDir);

  // Init and commit
  execSync('git init', { stdio: 'ignore' });
  execSync('git add .', { stdio: 'ignore' });
  execSync('git commit -m "deploy"', { stdio: 'ignore' });

  // Force push to gh-pages branch of target repo
  execSync(
    'git push -f git@github.com:ndongwoo/hhakorea.git HEAD:gh-pages',
    { stdio: 'inherit' }
  );

  console.log('✅ Deployed to gh-pages branch');
} catch (err) {
  console.error(err);
  process.exit(1);
}