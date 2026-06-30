import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogsDir = path.join(__dirname, 'docs', 'blogs');
const categories = fs.readdirSync(blogsDir);
let total = 0;
const articles = [];

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  const lines = match[1].split('\n');
  let currentKey = null;
  for (const line of lines) {
    if (line.match(/^[\w-]+:/)) {
      const [key, ...rest] = line.split(':');
      const value = rest.join(':').trim();
      if (value === '') {
        currentKey = key.trim();
        fm[currentKey] = [];
      } else {
        fm[key.trim()] = value;
        currentKey = null;
      }
    } else if (currentKey && line.trim().startsWith('- ')) {
      fm[currentKey].push(line.trim().slice(2));
    }
  }
  return fm;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[，。！？、：；""''（）《》【】]/g, '')
    .replace(/[\s]+/g, '-')
    .replace(/[^a-z0-9\u4e00-\u9fa5-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function toPinyinSlug(title) {
  const commonChars = {
    'ai': 'ai', '工具': 'tools', '实测': 'review', '神器': 'tools',
    '让': '', '你的': 'your', '工作': 'work', '效率': 'efficiency',
    '翻倍': 'double',
    '普通人': 'ordinary', '如何': 'how-to', '抓住': 'seize',
    '红利': 'dividend', '个': '', '可': '', '落地': 'practical',
    '的': '', '应用': 'application', '场景': 'scenarios',
    '读懂': 'understanding', '红楼梦': 'hongloumeng', '才算': 'only-then',
    '中国式': 'chinese-style', '人情世故': 'relationships',
    '摆脱': 'break-free', '精神内耗': 'mental-fatigue', '瞬间': 'instant',
    '清醒': 'sober', '思维': 'thinking', '模型': 'models'
  };
  return slugify(title);
}

for (const cat of categories) {
  const catDir = path.join(blogsDir, cat);
  if (!fs.statSync(catDir).isDirectory()) continue;
  const years = fs.readdirSync(catDir);
  for (const year of years) {
    const yearDir = path.join(catDir, year);
    if (!fs.statSync(yearDir).isDirectory()) continue;
    const files = fs.readdirSync(yearDir).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const filePath = path.join(yearDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const fm = parseFrontmatter(content);
      articles.push({
        path: filePath,
        file,
        category: cat,
        year,
        title: fm.title || '无标题',
        date: fm.date || ''
      });
      total++;
    }
  }
}

console.log('总文章数:', total);
console.log('');

const byCat = {};
for (const a of articles) {
  if (!byCat[a.category]) byCat[a.category] = [];
  byCat[a.category].push(a);
}

console.log('=== 当前命名方案预览（文件名 → 标题）:');
console.log('');
for (const cat of Object.keys(byCat).sort()) {
  console.log('【' + cat + '】(' + byCat[cat].length + '篇)');
  for (const a of byCat[cat]) {
    console.log('  ' + a.file + ' → ' + a.title);
  }
  console.log('');
}

console.log('');
console.log('=== 方案一：日期+标题拼音slug');
console.log('');
for (const cat of Object.keys(byCat).sort()) {
  console.log('【' + cat + '】');
  for (const a of byCat[cat]) {
    const datePart = a.date || a.file.replace(/\.md$/, '');
    const slug = slugify(a.title).slice(0, 50);
    const newName = datePart + '-' + slug + '.md';
    console.log('  ' + a.file + ' → ' + newName);
  }
  console.log('');
}
