const puppeteer = require('puppeteer');

async function main() {
  const browser = await puppeteer.launch(); // 헤드리스 브라우저를 실행
  const page = await browser.newPage(); // 브라우저에 새 페이지(탭) 생성

  const pageUrl = 'https://yjiq150.github.io/coronaboard-crawling-sample/http-api-with-button';
  await page.goto(pageUrl, {
    waitUntil: 'networkidle0', // 모든 네트워크 연결이 500ms 이상 유휴 상태가 될때까지 기다림
  });

  // 제목/내용 불러오기 버튼을 클릭
  await page.click('input[type="button"]');

  await page.waitForFunction(() => {
    // 이 함수는 웹브라우저의 컨텍스트에서 실행되기 때문에 document 객체에 접근 가능
    return document.getElementById('content').textContent.length > 0;
  });

  // 특정 셀렉터에 대해
  const content = await page.$$eval(
    '#content',
    (elements) => elements[0].textContent,
  );

  console.log(content);

  await browser.close(); // 작업이 완료되면 브라우저를 종료
}

main();
