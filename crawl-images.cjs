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

const azurlaneShips = [
  { name: '企业', url: 'https://wiki.biligame.com/blhx/%E4%BC%81%E4%B8%9A' },
  { name: '光辉', url: 'https://wiki.biligame.com/blhx/%E5%85%89%E8%BE%89' },
  { name: '厌战', url: 'https://wiki.biligame.com/blhx/%E5%8E%8C%E6%88%98' },
  { name: '胡德', url: 'https://wiki.biligame.com/blhx/%E8%83%A1%E5%BE%B7' },
  { name: '威尔士亲王', url: 'https://wiki.biligame.com/blhx/%E5%A8%81%E5%B0%94%E5%A3%AB%E4%BA%B2%E7%8E%8B' },
  { name: '伊丽莎白女王', url: 'https://wiki.biligame.com/blhx/%E4%BC%8A%E4%B8%BD%E8%8E%8E%E7%99%BD%E5%A5%B3%E7%8E%8B' },
  { name: '皇家方舟', url: 'https://wiki.biligame.com/blhx/%E7%9A%87%E5%AE%B6%E6%96%B9%E8%88%9F' },
  { name: '贝尔法斯特', url: 'https://wiki.biligame.com/blhx/%E8%B4%9D%E5%B0%94%E6%B3%95%E6%96%AF%E7%89%B9' },
  { name: '拉菲', url: 'https://wiki.biligame.com/blhx/%E6%8B%89%E8%8F%B2' },
  { name: '标枪', url: 'https://wiki.biligame.com/blhx/%E6%A0%87%E6%9E%AA' },
  { name: 'Z23', url: 'https://wiki.biligame.com/blhx/Z23' },
  { name: '绫波', url: 'https://wiki.biligame.com/blhx/%E7%BB%AB%E6%B3%A2' },
  { name: '吹雪', url: 'https://wiki.biligame.com/blhx/%E5%90%B9%E9%9B%AA' },
  { name: '明石', url: 'https://wiki.biligame.com/blhx/%E6%98%8E%E7%9F%B3' },
  { name: '女灶神', url: 'https://wiki.biligame.com/blhx/%E5%A5%B3%E7%81%B6%E7%A5%9E' },
  { name: '独角兽', url: 'https://wiki.biligame.com/blhx/%E7%8B%AC%E8%A7%92%E5%85%BD' },
  { name: '克利夫兰', url: 'https://wiki.biligame.com/blhx/%E5%85%8B%E5%88%A9%E5%A4%AB%E5%85%B0' },
  { name: '海伦娜', url: 'https://wiki.biligame.com/blhx/%E6%B5%B7%E4%BC%A6%E5%A8%9C' },
  { name: '欧根亲王', url: 'https://wiki.biligame.com/blhx/%E6%AC%A7%E6%A0%B9%E4%BA%B2%E7%8E%8B' },
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
      
      const images = [];
      $('img').each((_, img) => {
        const src = $(img).attr('src') || '';
        const alt = $(img).attr('alt') || '';
        if (src.includes('patchwiki.biligame.com/images/blhx/') && 
            !src.includes('/thumb/') &&
            !src.includes('头像') &&
            !src.includes('外框') &&
            !src.includes('Skillicon') &&
            !src.includes('科技点') &&
            !alt.includes('耐久') &&
            !alt.includes('防空') &&
            !alt.includes('机动') &&
            !alt.includes('航空') &&
            !alt.includes('雷击') &&
            !alt.includes('炮击') &&
            (src.endsWith('.jpg') || src.endsWith('.png') || src.endsWith('.jpeg'))) {
          images.push({ src, alt });
        }
      });
      
      let count = 0;
      for (const img of images) {
        if (count >= 2) break;
        const ext = path.extname(img.src).split('?')[0];
        const filename = `${ship.name}-${count+1}${ext}`;
        const filepath = path.join(azurlaneDir, filename);
        const result = await downloadImage(img.src, filepath);
        if (result) {
          results.push({ name: ship.name, filename, alt: img.alt });
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

const jianghuImages = [
  { name: '游戏主视觉', url: 'https://jh.awsl8.com/images/cadpa_16.jpg' },
  { name: '游戏logo', url: 'https://axe-video-1257242485.cos.ap-guangzhou.myqcloud.com/site_video/jh/dj/yx_tit_1.png' },
  { name: '角色展示1', url: 'https://axe-video-1257242485.cos.ap-guangzhou.myqcloud.com/site_video/jh/dj/tab_pic_1_new.png' },
  { name: '角色展示2', url: 'https://axe-video-1257242485.cos.ap-guangzhou.myqcloud.com/site_video/jh/dj/tab_xxxx_1_new.png' },
  { name: '新闻图片', url: 'https://jh.awsl8.com/images/news_pic.jpg' },
  { name: '文章背景', url: 'https://jh.awsl8.com/images/article_bg.jpg' },
  { name: '首页banner', url: 'https://jh.awsl8.com/images/home_banner.jpg' },
  { name: '游戏背景', url: 'https://jh.awsl8.com/images/yx_bg.jpg' },
];

async function crawlJianghu() {
  console.log('开始下载江湖如梦图片...');
  const results = [];
  
  for (let i = 0; i < jianghuImages.length; i++) {
    const img = jianghuImages[i];
    console.log(`正在下载 ${img.name} (${i+1}/${jianghuImages.length})...`);
    const ext = path.extname(img.url).split('?')[0] || '.jpg';
    const filename = `${img.name}${ext}`;
    const filepath = path.join(jianghuDir, filename);
    const result = await downloadImage(img.url, filepath);
    if (result) {
      results.push({ name: img.name, filename });
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
  console.log(`江湖如梦: ${jianghuResults.length} 张`);
}

main().catch(console.error);
