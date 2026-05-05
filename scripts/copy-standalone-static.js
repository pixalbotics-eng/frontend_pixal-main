/**
 * Copies .next/static into .next/standalone/.next/static for cPanel/standalone deploy.
 * Run after: npm run build
 * Then upload the contents of .next/standalone to your server.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const staticSrc = path.join(root, '.next', 'static');
const staticDest = path.join(root, '.next', 'standalone', '.next', 'static');
const publicSrc = path.join(root, 'public');
const publicDest = path.join(root, '.next', 'standalone', 'public');

if (!fs.existsSync(path.join(root, '.next', 'standalone'))) {
  console.error('Error: .next/standalone not found. Run "npm run build" first.');
  process.exit(1);
}

if (!fs.existsSync(staticSrc)) {
  console.error('Error: .next/static not found. Run "npm run build" first.');
  process.exit(1);
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyRecursive(staticSrc, staticDest);
console.log('Done: .next/static copied to .next/standalone/.next/static');

if (fs.existsSync(publicSrc)) {
  copyRecursive(publicSrc, publicDest);
  console.log('Done: public/ copied to .next/standalone/public/');
} else {
  console.log('Skip: no public/ folder at project root.');
}

// SEO env reference for cPanel – user yahan apni SEO links daal sakta hai (Environment Variables me)
const standaloneDir = path.join(root, '.next', 'standalone');
const seoEnvRef = `# SEO / Metadata – cPanel Node.js App → Environment Variables me ye add karo
# Link share hone par logo + title sahi aayega, Google search me bhi ye use hota hai

# Apna site URL (zaroori – jis domain par site chal rahi hai)
SITE_URL=https://yourdomain.com

# Google Search Console verification code (optional)
# GOOGLE_SITE_VERIFICATION=abc123xyz

# Social / other links – comma-separated (optional, JSON-LD sameAs me jata hai)
# SEO_SAME_AS=https://facebook.com/yourpage,https://twitter.com/yourpage,https://linkedin.com/company/yourpage
`;
fs.writeFileSync(path.join(standaloneDir, 'SEO_CPANEL_ENV.txt'), seoEnvRef, 'utf8');

console.log('Done: SEO_CPANEL_ENV.txt added to standalone (SEO env reference for cPanel).');
console.log('');
console.log('cPanel deploy: upload EVERYTHING inside .next/standalone/ to your Node app root.');
console.log('Startup: node server.js   |   Set NODE_ENV=production and PORT (cPanel assigns this).');
