const path = require('path');
const fs = require('fs');

const ApiClient = require('./api-client');
const { crawlAndUpdateGlobal } = require('./global-updater');
const { crawlAndUpdateDomestic } = require('./domestic-updater');

async function main() {
  // 마지막으로 크롤링 했던 데이터를 파일로 저장해두기 위한 폴더 경로
  const outputPath = path.join(process.cwd(), 'output');
  // 폴더가 없다면 생성
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
  }

  const apiClient = new ApiClient();

  try {
    console.log('crawlAndUpdateDomestic started');
    await crawlAndUpdateDomestic(outputPath, apiClient);
  } catch (e) {
    console.error('crawlAndUpdateDomestic failed', e);
  }

  try {
    console.log('crawlAndUpdateGlobal started');
    await crawlAndUpdateGlobal(outputPath, apiClient);
  } catch (e) {
    console.error('crawlAndUpdateGlobal failed', e);
  }
}

main();
