const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const azurlaneDir = path.join(__dirname, 'docs', '.vuepress', 'public', 'images', 'game', 'azurlane');
const jianghuDir = path.join(__dirname, 'docs', '.vuepress', 'public', 'images', 'game', 'jianghu');

if (!fs.existsSync(azurlaneDir)) {
  fs.mkdirSync(azurlaneDir, { recursive: true });
}
if (!fs.existsSync(jianghuDir)) {
  fs.mkdirSync(jianghuDir, { recursive: true });
}

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Referer': 'https://wiki.biligame.com/'
};

function getOriginalUrl(thumbUrl) {
  const match = thumbUrl.match(/\/images\/blhx\/thumb\/([^/]+\/[^/]+\/[^/]+)\/\d+px-/);
  if (match) {
    return 'https://patchwiki.biligame.com/images/blhx/' + match[1];
  }
  if (thumbUrl.includes('/images/blhx/') && !thumbUrl.includes('/thumb/')) {
    return thumbUrl;
  }
  return null;
}

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

const azurlaneShips = [
  { name: '企业', url: 'https://wiki.biligame.com/blhx/%E4%BC%81%E4%B8%9A' },
  { name: '光辉', url: 'https://wiki.biligame.com/blhx/%E5%85%89%E8%BE%89' },
  { name: '胡德', url: 'https://wiki.biligame.com/blhx/%E8%83%A1%E5%BE%B7' },
  { name: '贝尔法斯特', url: 'https://wiki.biligame.com/blhx/%E8%B4%9D%E5%B0%94%E6%B3%95%E6%96%AF%E7%89%B9' },
  { name: '拉菲', url: 'https://wiki.biligame.com/blhx/%E6%8B%89%E8%8F%B2' },
  { name: '绫波', url: 'https://wiki.biligame.com/blhx/%E7%BB%AB%E6%B3%A2' },
  { name: '克利夫兰', url: 'https://wiki.biligame.com/blhx/%E5%85%8B%E5%88%A9%E5%A4%AB%E5%85%B0' },
  { name: '欧根亲王', url: 'https://wiki.biligame.com/blhx/%E6%AC%A7%E6%A0%B9%E4%BA%B2%E7%8E%8B' },
  { name: '明石', url: 'https://wiki.biligame.com/blhx/%E6%98%8E%E7%9F%B3' },
  { name: '独角兽', url: 'https://wiki.biligame.com/blhx/%E7%8B%AC%E8%A7%92%E5%85%BD' },
  { name: '伊丽莎白女王', url: 'https://wiki.biligame.com/blhx/%E4%BC%8A%E4%B8%BD%E8%8E%8E%E7%99%BD%E5%A5%B3%E7%8E%8B' },
  { name: '女灶神', url: 'https://wiki.biligame.com/blhx/%E5%A5%B3%E7%81%B6%E7%A5%9E' },
  { name: '皇家方舟', url: 'https://wiki.biligame.com/blhx/%E7%9A%87%E5%AE%B6%E6%96%B9%E8%88%9F' },
  { name: '海伦娜', url: 'https://wiki.biligame.com/blhx/%E6%B5%B7%E4%BC%A6%E5%A8%9C' },
  { name: 'Z23', url: 'https://wiki.biligame.com/blhx/Z23' },
  { name: '俾斯麦', url: 'https://wiki.biligame.com/blhx/%E4%BF%BE%E6%96%AF%E9%BA%A6' },
];

async function crawlAzurlane() {
  console.log('开始爬取碧蓝航线舰娘图片...');
  const results = [];
  
  for (let i = 0; i < azurlaneShips.length; i++) {
    const ship = azurlaneShips[i];
    console.log(`正在爬取 ${ship.name} (${i+1}/${azurlaneShips.length})...`);
    
    try {
      const response = await axios.get(ship.url, { headers });
      const $ = cheerio.load(response.data);
      
      const foundImages = [];
      $('img').each((_, img) => {
        const src = $(img).attr('src') || '';
        const alt = $(img).attr('alt') || '';
        
        if (!src.includes('patchwiki.biligame.com/images/blhx/')) return;
        if (alt.includes('Q版') || alt.includes('头像') || alt.includes('外框') || alt.includes('Skillicon') || alt.includes('科技点')) return;
        if (alt.includes('耐久') || alt.includes('防空') || alt.includes('机动') || alt.includes('航空') || alt.includes('雷击') || alt.includes('炮击')) return;
        if (alt.includes('JUUS') || alt.includes('改造') || alt.includes('蓝图')) return;
        
        const originalUrl = getOriginalUrl(src);
        if (!originalUrl) return;
        
        if (alt.includes('立绘') && !alt.includes('Q版')) {
          foundImages.unshift({ src: originalUrl, alt, type: '立绘' });
        } else if (alt.includes('换装') && !alt.includes('Q版')) {
          foundImages.push({ src: originalUrl, alt, type: '换装' });
        } else if (alt.includes('誓约') && !alt.includes('Q版')) {
          foundImages.push({ src: originalUrl, alt, type: '誓约' });
        }
      });
      
      let count = 0;
      for (const img of foundImages) {
        if (count >= 2) break;
        const ext = path.extname(img.src).split('?')[0] || '.jpg';
        const filename = `${ship.name}-${count+1}${ext}`;
        const filepath = path.join(azurlaneDir, filename);
        console.log(`  下载 ${img.type}: ${img.alt} -> ${filename}`);
        const result = await downloadImage(img.src, filepath);
        if (result) {
          results.push({ name: ship.name, filename, alt: img.alt, type: img.type });
          count++;
        }
      }
      
      if (count === 0) {
        console.log(`  未找到 ${ship.name} 的立绘图片`);
      }
      
      await new Promise(r => setTimeout(r, 500));
    } catch (e) {
      console.log(`  爬取 ${ship.name} 失败: ${e.message}`);
    }
  }
  
  console.log(`碧蓝航线爬取完成，共获取 ${results.length} 张图片`);
  return results;
}

const jianghuCharacters = [
  { name: '绮鸳', index: 1 },
  { name: '司徒痴', index: 2 },
  { name: '薄雁君', index: 3 },
  { name: '上官妙语', index: 4 },
  { name: '许缁衣', index: 5 },
  { name: '染苍群', index: 6 },
  { name: '何君盼', index: 7 },
  { name: '独孤寂', index: 8 },
  { name: '胡彦之', index: 9 },
  { name: '魏无音', index: 10 },
];

const jianghuBaseUrl = 'https://axe-video-1257242485.cos.ap-guangzhou.myqcloud.com/site_video/jh/dj/';

async function crawlJianghu() {
  console.log('\n开始下载江湖如梦角色图片...');
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
  
  for (let i = 0; i < jianghuCharacters.length; i++) {
    const char = jianghuCharacters[i];
    console.log(`正在下载 ${char.name} (${i+1}/${jianghuCharacters.length})...`);
    
    const lihuiUrl = `${jianghuBaseUrl}tab_pic_${char.index}_new.png`;
    const mingtieUrl = `${jianghuBaseUrl}tab_xxxx_${char.index}_new.png`;
    
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
  const azurlaneResults = await crawlAzurlane();
  console.log('\n');
  const jianghuResults = await crawlJianghu();
  
  console.log('\n=== 爬取结果汇总 ===');
  console.log(`碧蓝航线: ${azurlaneResults.length} 张`);
  azurlaneResults.forEach(r => console.log(`  ${r.name} - ${r.type}: ${r.filename}`));
  console.log(`江湖如梦: ${jianghuResults.length} 张`);
  jianghuResults.forEach(r => console.log(`  ${r.name} - ${r.type}: ${r.filename}`));
}

main().catch(console.error);
