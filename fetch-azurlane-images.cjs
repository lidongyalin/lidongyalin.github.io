const axios = require('axios');
const cheerio = require('cheerio');

const shipGirls = [
  { name: '企业', urlName: '%E4%BC%81%E4%B8%9A' },
  { name: '光辉', urlName: '%E5%85%89%E8%BE%89' },
  { name: '伊丽莎白女王', urlName: '%E4%BC%8A%E4%B8%BD%E8%8E%8E%E7%99%BD%E5%A5%B3%E7%8E%8B' },
  { name: '贝尔法斯特', urlName: '%E8%B4%9D%E5%B0%94%E6%B3%95%E6%96%AF%E7%89%B9' },
  { name: '拉菲', urlName: '%E6%8B%89%E8%8F%B2' },
  { name: '绫波', urlName: '%E7%BB%AB%E6%B3%A2' },
  { name: '克利夫兰', urlName: '%E5%85%8B%E5%88%A9%E5%A4%AB%E5%85%B0' },
  { name: '女灶神', urlName: '%E5%A5%B3%E7%81%B6%E7%A5%9E' },
  { name: '明石', urlName: '%E6%98%8E%E7%9F%B3' },
  { name: '皇家方舟', urlName: '%E7%9A%87%E5%AE%B6%E6%96%B9%E8%88%9F' },
  { name: '海伦娜', urlName: '%E6%B5%B7%E4%BC%A6%E5%A8%9C' },
  { name: '胡德', urlName: '%E8%83%A1%E5%BE%B7' },
  { name: '提尔比茨', urlName: '%E6%8F%90%E5%B0%94%E6%AF%94%E5%85%B9' },
  { name: '长门', urlName: '%E9%95%BF%E9%97%A8' },
  { name: '赤城', urlName: '%E8%B5%A4%E5%9F%8E' },
  { name: '威尔士亲王', urlName: '%E5%A8%81%E5%B0%94%E5%A3%AB%E4%BA%B2%E7%8E%8B' },
];

async function getShipGirlImages(name, urlName) {
  try {
    const url = `https://wiki.biligame.com/blhx/${urlName}`;
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const $ = cheerio.load(response.data);
    const images = [];
    
    $('img').each((i, img) => {
      const src = $(img).attr('src') || '';
      if (src.includes('aka.doubaocdn.com') && src.includes('1wf')) {
        if (!images.includes(src)) {
          images.push(src);
        }
      }
    });
    
    console.log(`${name}: 找到 ${images.length} 张图片`);
    images.forEach((img, i) => {
      console.log(`  ${i + 1}. ${img}`);
    });
    
    return { name, images };
  } catch (error) {
    console.log(`${name}: 获取失败 - ${error.message}`);
    return { name, images: [] };
  }
}

async function main() {
  const results = [];
  for (const ship of shipGirls) {
    const result = await getShipGirlImages(ship.name, ship.urlName);
    results.push(result);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n\n=== 汇总 ===');
  results.forEach(r => {
    if (r.images.length > 0) {
      console.log(`\n${r.name}:`);
      r.images.forEach((img, i) => {
        console.log(`  ${i + 1}. ${img}`);
      });
    }
  });
}

main();
