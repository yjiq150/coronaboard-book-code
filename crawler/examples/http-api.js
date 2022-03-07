const axios = require('axios');

async function main() {
  const resp = await axios.get(
    'https://yjiq150.github.io/coronaboard-crawling-sample/example-data.json',
  );

  console.log(resp.data.content); // 출력: 'API 호출로 받아온 내용입니다'
}

main();
