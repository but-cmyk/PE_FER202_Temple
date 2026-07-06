const fs = require('fs');
const path = require('path');

const files = [
  'generate_exams.js',
  'generate_pages.js',
  'generate_tests.js'
];

const scratchDir = __dirname;

for (let file of files) {
  const filePath = path.join(scratchDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    continue;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  // Replace all instances of \${d. with ${d.
  const updated = content.replace(/\\\$\{d\./g, '${d.');
  fs.writeFileSync(filePath, updated, 'utf8');
  console.log(`Fixed escapes in ${file}`);
}
