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
    console.log(`  下载失败 ${url}: ${e.message}`);
    return null;
  }
}

const baseUrl = 'https://axe-video-1257242485.cos.ap-guangzhou.myqcloud.com/site_video/jh/dj/';

const characters = [
  { name: '绮鸳', pic: 'tab_pic_1_new.png', xxxx: 'tab_xxxx_1_new.png' },
  { name: '司徒痴', pic: 'tab_pic_2_new.png', xxxx: 'tab_xxxx_2_new.png' },
  { name: '薄雁君', pic: 'tab_pic_3_new.png', xxxx: 'tab_xxxx_3_new.png' },
  { name: '上官妙语', pic: 'tab_pic_4_new.png', xxxx: 'tab_xxxx_4_new.png' },
  { name: '许缁衣', pic: 'tab_pic_5_new.png', xxxx: 'tab_xxxx_5_new.png' },
  { name: '染苍群', pic: 'tab_11_pic.png', xxxx: 'tab_11_xxxx.png' },
  { name: '何君盼', pic: 'tab_12_pic.png', xxxx: 'tab_12_xxxx.png' },
  { name: '独孤寂', pic: 'tab_13_pic.png', xxxx: 'tab_13_xxxx.png' },
  { name: '胡彦之', pic: 'tab_05_pic.png', xxxx: 'tab_05_xxxx.png' },
  { name: '魏无音', pic: 'tab_07_pic.png', xxxx: 'tab_07_xxxx.png' },
];

const sceneImages = [
  { name: '游戏主视觉', url: 'https://jh.awsl8.com/images/cadpa_16.jpg' },
  { name: '首页banner', url: 'https://jh.awsl8.com/images/home_banner.jpg' },
  { name: '游戏背景', url: 'https://jh.awsl8.com/images/yx_bg.jpg' },
  { name: '文章背景', url: 'https://jh.awsl8.com/images/article_bg.jpg' },
  { name: '新闻图片', url: 'https://jh.awsl8.com/images/news_pic.jpg' },
];

async function main() {
  console.log('开始下载江湖如梦图片...');
  const results = [];
  
  for (const img of sceneImages) {
    const ext = path.extname(img.url).split('?')[0] || '.jpg';
    const filename = `${img.name}${ext}`;
    const filepath = path.join(jianghuDir, filename);
    console.log(`正在下载 ${img.name}...`);
    const result = await downloadImage(img.url, filepath);
    if (result) {
      results.push({ name: img.name, filename, type: '场景' });
    }
    await new Promise(r => setTimeout(r, 200));
  }
  
  for (let i = 0; i < characters.length; i++) {
    const char = characters[i];
    console.log(`正在下载 ${char.name} (${i+1}/${characters.length})...`);
    
    const picUrl = baseUrl + char.pic;
    const xxxxUrl = baseUrl + char.xxxx;
    
    const picFile = `${char.name}-立绘.png`;
    const xxxxFile = `${char.name}-名帖.png`;
    
    const picPath = path.join(jianghuDir, picFile);
    const xxxxPath = path.join(jianghuDir, xxxxFile);
    
    const picResult = await downloadImage(picUrl, picPath);
    if (picResult) {
      results.push({ name: char.name, filename: picFile, type: '立绘' });
    }
    await new Promise(r => setTimeout(r, 300));
    
    const xxxxResult = await downloadImage(xxxxUrl, xxxxPath);
    if (xxxxResult) {
      results.push({ name: char.name, filename: xxxxFile, type: '名帖' });
    }
    await new Promise(r => setTimeout(r, 300));
  }
  
  console.log(`\n下载完成，共获取 ${results.length} 张图片`);
  console.log('\n=== 下载结果 ===');
  results.forEach(r => console.log(`  ${r.name} - ${r.type}: ${r.filename}`));
}

main().catch(console.error);
