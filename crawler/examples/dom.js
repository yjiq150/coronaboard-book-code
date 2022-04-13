const axios = require('axios');
const cheerio = require('cheerio');

async function main() {
  const resp = await axios.get(
      'https://yjiq150.github.io/coronaboard-crawling-sample/dom'
  );

  const $ = cheerio.load(resp.data);
  const elements = $('.slide p');

  elements.each((idx, el) => {
    console.log($(el).text());
  });
}

main();
