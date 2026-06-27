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

const characters = [
  { name: '绮鸳', index: '01' },
  { name: '司徒痴', index: '02' },
  { name: '薄雁君', index: '03' },
  { name: '上官妙语', index: '04' },
  { name: '许缁衣', index: '05' },
  { name: '染苍群', index: '06' },
  { name: '何君盼', index: '07' },
  { name: '独孤寂', index: '08' },
  { name: '新角色1', index: '11' },
  { name: '新角色2', index: '12' },
  { name: '新角色3', index: '13' },
];

const baseUrl = 'https://axe-video-1257242485.cos.ap-guangzhou.myqcloud.com/site_video/jh/dj/';

async function crawlJianghu() {
  console.log('开始下载江湖如梦角色图片...');
  const results = [];
  
  const sceneImages = [
    { name: '游戏主视觉', url: 'https://jh.awsl8.com/images/cadpa_16.jpg' },
    { name: '首页banner', url: 'https://jh.awsl8.com/images/home_banner.jpg' },
    { name: '游戏背景', url: 'https://jh.awsl8.com/images/yx_bg.jpg' },
    { name: '文章背景', url: 'https://jh.awsl8.com/images/article_bg.jpg' },
    { name: '新闻图片', url: 'https://jh.awsl8.com/images/news_pic.jpg' },
  ];
  
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
    
    const lihuiUrl = `${baseUrl}tab_${char.index}_pic.png`;
    const mingtieUrl = `${baseUrl}tab_${char.index}_xxxx.png`;
    
    const lihuiFile = `${char.name}-立绘.png`;
    const mingtieFile = `${char.name}-名帖.png`;
    
    const lihuiPath = path.join(jianghuDir, lihuiFile);
    const mingtiePath = path.join(jianghuDir, mingtieFile);
    
    const lihuiResult = await downloadImage(lihuiUrl, lihuiPath);
    if (lihuiResult) {
      results.push({ name: char.name, filename: lihuiFile, type: '立绘' });
    }
    await new Promise(r => setTimeout(r, 200));
    
    const mingtieResult = await downloadImage(mingtieUrl, mingtiePath);
    if (mingtieResult) {
      results.push({ name: char.name, filename: mingtieFile, type: '名帖' });
    }
    await new Promise(r => setTimeout(r, 200));
  }
  
  console.log(`江湖如梦下载完成，共获取 ${results.length} 张图片`);
  return results;
}

async function main() {
  const jianghuResults = await crawlJianghu();
  
  console.log('\n=== 爬取结果汇总 ===');
  console.log(`江湖如梦: ${jianghuResults.length} 张`);
  jianghuResults.forEach(r => console.log(`  ${r.name} - ${r.type}: ${r.filename}`));
}

main().catch(console.error);
