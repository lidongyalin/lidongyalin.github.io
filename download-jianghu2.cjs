const axios = require('axios');
const fs = require('fs');
const path = require('path');

const jianghuDir = path.join(__dirname, 'docs', '.vuepress', 'public', 'images', 'game', 'jianghu');

if (!fs.existsSync(jianghuDir)) {
  fs.mkdirSync(jianghuDir, { recursive: true });
}

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Referer': 'https://jh.awsl8.com/'
};

const characters = [
  { name: '染苍群', pic: 'tab_11_pic.png', xxxx: 'tab_11_xxxx.png' },
  { name: '何君盼', pic: 'tab_12_pic.png', xxxx: 'tab_12_xxxx.png' },
  { name: '独孤寂', pic: 'tab_13_pic.png', xxxx: 'tab_13_xxxx.png' },
  { name: '胡彦之', pic: 'tab_05_pic.png', xxxx: 'tab_05_xxxx.png' },
  { name: '魏无音', pic: 'tab_07_pic.png', xxxx: 'tab_07_xxxx.png' },
];

const baseUrl = 'https://axe-video-1257242485.cos.ap-guangzhou.myqcloud.com/site_video/jh/dj/';

async function downloadImage(url, filepath) {
  try {
    const response = await axios.get(url, {
      responseType: 'stream',
      headers: headers
    });
    response.data.pipe(fs.createWriteStream(filepath));
    return new Promise((resolve, reject) => {
      response.data.on('end', () => resolve(filepath));
      response.data.on('error', reject);
    });
  } catch (e) {
    console.log(`Failed to download ${url}: ${e.message}`);
    return null;
  }
}

async function main() {
  console.log('开始下载剩余江湖如梦角色图片...');
  let count = 0;
  
  for (const char of characters) {
    console.log(`正在下载 ${char.name}...`);
    
    const picUrl = baseUrl + char.pic;
    const xxxxUrl = baseUrl + char.xxxx;
    
    const picPath = path.join(jianghuDir, `${char.name}-立绘.png`);
    const xxxxPath = path.join(jianghuDir, `${char.name}-名帖.png`);
    
    const r1 = await downloadImage(picUrl, picPath);
    if (r1) count++;
    const r2 = await downloadImage(xxxxUrl, xxxxPath);
    if (r2) count++;
    
    await new Promise(r => setTimeout(r, 200));
  }
  
  console.log(`下载完成，新增 ${count} 张角色图片`);
}

main().catch(console.error);
