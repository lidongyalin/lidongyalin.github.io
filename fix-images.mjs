import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const gameDir = path.join(__dirname, 'docs', 'views', 'game', '2026');

const seedMaps = {
  '062601.md': [
    'blackmyth-cover',
    'blackmyth-battle',
    'blackmyth-temple',
    'blackmyth-landscape',
    'blackmyth-mountain',
    'blackmyth-desert',
    'blackmyth-snow',
    'blackmyth-spider',
    'blackmyth-volcano',
    'blackmyth-waterfall',
  ],
  '062602.md': [
    'azurlane-cover',
    'azurlane-battle',
    'azurlane-naval',
    'azurlane-characters',
    'azurlane-carrier',
    'azurlane-eagle',
    'azurlane-royal',
    'azurlane-sakura',
    'azurlane-dragon',
    'azurlane-wedding',
  ],
  '062603.md': [
    'jianghu-cover',
    'jianghu-ink',
    'jianghu-wuxia',
    'jianghu-characters',
    'jianghu-sect',
    'jianghu-female',
    'jianghu-mysterious',
    'jianghu-battle',
    'jianghu-temple',
    'jianghu-pavilion',
  ],
};

const oldPattern = /!\[(.*?)\]\(https:\/\/trae-api-cn\.mchost\.guru\/api\/ide\/v1\/text_to_image\?prompt=.*?&image_size=landscape_16_9\)/g;

for (const [filename, seeds] of Object.entries(seedMaps)) {
  const filePath = path.join(gameDir, filename);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  let seedIndex = 0;
  content = content.replace(oldPattern, (match, altText) => {
    const seed = seeds[seedIndex] || `img-${seedIndex}`;
    seedIndex++;
    return `![${altText}](https://picsum.photos/seed/${seed}/800/450)`;
  });
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Processed: ${filename}, replaced ${seedIndex} images`);
}

console.log('Done!');
