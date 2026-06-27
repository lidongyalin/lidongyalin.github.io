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
  '绮鸳', '司徒痴', '薄雁君', '上官妙语', '许缁衣',
  '染苍群', '何君盼', '独孤寂', '胡彦之', '魏无音'
];

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
  console.log('开始下载江湖如梦角色图片...');
  let count = 0;
  
  for (let i = 0; i < characters.length; i++) {
    const name = characters[i];
    const num = i + 1;
    console.log(`正在下载 ${name} (${num}/${characters.length})...`);
    
    const picUrl = `https://axe-video-1257242485.cos.ap-guangzhou.myqcloud.com/site_video/jh/dj/tab_pic_${num}_new.png`;
    const xxxxUrl = `https://axe-video-1257242485.cos.ap-guangzhou.myqcloud.com/site_video/jh/dj/tab_xxxx_${num}_new.png`;
    
    const picPath = path.join(jianghuDir, `${name}-立绘.png`);
    const xxxxPath = path.join(jianghuDir, `${name}-名帖.png`);
    
    const r1 = await downloadImage(picUrl, picPath);
    if (r1) count++;
    const r2 = await downloadImage(xxxxUrl, xxxxPath);
    if (r2) count++;
    
    await new Promise(r => setTimeout(r, 200));
  }
  
  console.log(`下载完成，共获取 ${count} 张角色图片`);
}

main().catch(console.error);
