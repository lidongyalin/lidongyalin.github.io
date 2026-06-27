const axios = require('axios');
const fs = require('fs');
const path = require('path');

const azurlaneDir = path.join(__dirname, 'docs', '.vuepress', 'public', 'images', 'game', 'azurlane');

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

const ships = [
  { name: '胡德', url: 'https://wiki.biligame.com/blhx/%E8%83%A1%E5%BE%B7' },
  { name: '欧根亲王', url: 'https://wiki.biligame.com/blhx/%E6%AC%A7%E6%A0%B9%E4%BA%B2%E7%8E%8B' },
  { name: '独角兽', url: 'https://wiki.biligame.com/blhx/%E7%8B%AC%E8%A7%92%E5%85%BD' },
  { name: 'Z23', url: 'https://wiki.biligame.com/blhx/Z23' },
  { name: '俾斯麦', url: 'https://wiki.biligame.com/blhx/%E4%BF%BE%E6%96%AF%E9%BA%A6' },
];

const cheerio = require('cheerio');

async function crawlShip(ship) {
  console.log(`正在爬取 ${ship.name}...`);
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
    
    console.log(`  找到 ${foundImages.length} 张图片`);
    
    let count = 0;
    for (const img of foundImages) {
      if (count >= 2) break;
      const ext = path.extname(img.src).split('?')[0] || '.jpg';
      const filename = `${ship.name}-${count+1}${ext}`;
      const filepath = path.join(azurlaneDir, filename);
      console.log(`  下载 ${img.type}: ${img.alt} -> ${filename}`);
      const result = await downloadImage(img.src, filepath);
      if (result) {
        count++;
      }
      await new Promise(r => setTimeout(r, 1000));
    }
    
    return count;
  } catch (e) {
    console.log(`  爬取 ${ship.name} 失败: ${e.message}`);
    return 0;
  }
}

async function main() {
  for (const ship of ships) {
    await crawlShip(ship);
    await new Promise(r => setTimeout(r, 2000));
  }
}

main().catch(console.error);
