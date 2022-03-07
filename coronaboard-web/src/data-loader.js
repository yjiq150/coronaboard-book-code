const { subDays } = require('date-fns');
const { format, utcToZonedTime } = require('date-fns-tz');
const _ = require('lodash');

const countryInfo = require('../../tools/downloaded/countryInfo.json');
const ApiClient = require('./api-client');
const notice = require('../../tools/downloaded/notice.json');

const path = require('path');
const fs = require('fs-extra');

const { getYouTubeVideosByKeyword } = require('./youtube');

async function getDataSource() {
  const countryByCc = _.keyBy(countryInfo, 'cc');

  const apiClient = new ApiClient();

  // 7장에서 수집해서 저장해둔 전세계 통계를 로드
  const allGlobalStats = await apiClient.getAllGlobalStats();
  const groupedByDate = _.groupBy(allGlobalStats, 'date');

  const globalStats = generateGlobalStats(groupedByDate);
  const globalChartDataByCc = generateGlobalChartDataByCc(groupedByDate);

  // 전 기간에 대한 국가별 데이터는 양이 많기 때문에 전부 정적 웹페이지에 주입해버리면 페이지 용량이 크게 증가되고
  // 이 때문에 초기 로딩이 느림. 따라서 국가 코드별로 나누어서 json 파일로 저장해 두고 사용자 선택에 따라
  // 필요시점에 API 호출하듯이 json 파일을 요청하여 국가별 데이터를 로드할 수 있게 함
  Object.keys(globalChartDataByCc).forEach((cc) => {
    // static/generated 디렉터리는 데이터에따라 매번 생성되는 파일이기 때문에 .gitignore에 추가해서 git 저장소에 추가되지 않도록 할것
    const genPath = path.join(process.cwd(), `static/generated/${cc}.json`);
    fs.outputFileSync(genPath, JSON.stringify(globalChartDataByCc[cc]));
  });

  const koreaTestChartData = generateKoreaTestChartData(allGlobalStats);

  // 7장에서 수집해서 저장해둔 연령대별, 성별 통계를 로드
  const { byAge, bySex } = await apiClient.getByAgeAndBySex();

  // 유튜브 API를 이용하여 코로나19 관련 영상 정보를 로드
  const youtubeVideos = await getYouTubeVideosByKeyword('코로나19');

  return {
    lastUpdated: Date.now(),
    globalStats,
    countryByCc,
    notice: notice.filter((x) => !x.hidden),
    koreaTestChartData,
    koreaBySexChartData: bySex,
    koreaByAgeChartData: byAge,
    youtubeVideos,
  };
}

function generateKoreaTestChartData(allGlobalStats) {
  const krData = allGlobalStats.filter((x) => x.cc === 'KR');

  return {
    date: krData.map((x) => x.date),
    confirmedRate: krData.map((x) => x.confirmed / (x.confirmed + x.negative)),
    confirmed: krData.map((x) => x.confirmed),
    negative: krData.map((x) => x.negative),
    testing: krData.map((x) => x.testing),
  };
}

function generateGlobalStats(groupedByDate) {
  // const now = new Date();
  const now = new Date('2021-06-05');
  const timeZone = 'Asia/Seoul';
  const today = format(utcToZonedTime(now, timeZone), 'yyyy-MM-dd');
  const yesterday = format(
    utcToZonedTime(subDays(now, 1), timeZone),
    'yyyy-MM-dd',
  );

  if (!groupedByDate[today]) {
    throw new Error('Data for today is missing');
  }

  return createGlobalStatWithPrevField(
    groupedByDate[today],
    groupedByDate[yesterday],
  );
}

function createGlobalStatWithPrevField(todayStats, yesterdayStats) {
  const yesterdayStatsByCc = _.keyBy(yesterdayStats, 'cc');

  const globalStatWithPrev = todayStats.map((todayStat) => {
    const cc = todayStat.cc;
    const yesterdayStat = yesterdayStatsByCc[cc];
    if (yesterdayStat) {
      return {
        ...todayStat,
        confirmedPrev: yesterdayStat.confirmed || 0,
        deathPrev: yesterdayStat.death || 0,
        negativePrev: yesterdayStat.negative || 0,
        releasedPrev: yesterdayStat.released || 0,
        testedPrev: yesterdayStat.tested || 0,
      };
    }

    return todayStat;
  });

  return globalStatWithPrev;
}

// groupedByDate
// {
//   "2021-01-01": [
//     {cc: 'KR', confirmed: 1000, death: 2},
//     {cc: 'US', confirmed: 30000, death: 20}
//   ],
//   "2021-01-02": [
//     {cc: 'KR', confirmed: 1200, death: 2},
//     {cc: 'US', confirmed: 35000, death: 10}
//   ]
// }

// 반환 결과
// {
//   "KR": {
//     date: ["2021-01-01", "2021-01-02", ...],
//     confirmedAcc: [1000, 1200, ...],
//     confirmed: [1000, 200, ...],
//     deathAcc: [2, 2, ...],
//     death: [2, 0, ...]
//   },
//   "US": {
//     date: ["2021-01-01", "2021-01-02", ...],
//     confirmedAcc: [30000, 65000, ...],
//     confirmed: [30000, 35000, ...],
//     deathAcc: [20, 30, ...],
//     death: [20, 10, ...]
//   }
// }

function generateGlobalChartDataByCc(groupedByDate) {
  // 국가 코드를 필드 이름으로 하여 차트 데이터를 저장해둘 객체 선언
  const chartDataByCc = {};
  // 모든 키값(날짜)를 불러와서 날짜순으로 정렬
  const dates = Object.keys(groupedByDate).sort();
  for (const date of dates) {
    const countriesDataForOneDay = groupedByDate[date];
    for (const countryData of countriesDataForOneDay) {
      const cc = countryData.cc;
      // 특정 국가의 차트 데이터를 나타내는 객체가 아직 정의되지 않았다면 기본 형태로 생성
      if (!chartDataByCc[cc]) {
        chartDataByCc[cc] = {
          date: [],
          confirmed: [],
          confirmedAcc: [],
          death: [],
          deathAcc: [],
          released: [],
          releasedAcc: [],
        };
      }

      appendToChartData(chartDataByCc[cc], countryData, date);
    }

    // 날짜별로 모든 국가에대한 합산 데이터를 global 이라는 키값을 이용하여 저장
    if (!chartDataByCc['global']) {
      chartDataByCc['global'] = {
        date: [],
        confirmed: [],
        confirmedAcc: [],
        death: [],
        deathAcc: [],
        released: [],
        releasedAcc: [],
      };
    }

    const countryDataSum = countriesDataForOneDay.reduce(
      (sum, x) => ({
        confirmed: sum.confirmed + x.confirmed,
        death: sum.death + x.death,
        released: sum.released + (x.released || 0), // release 데이터가 없는 국가들이 존재
      }),
      { confirmed: 0, death: 0, released: 0 },
    );

    appendToChartData(chartDataByCc['global'], countryDataSum, date);
  }

  return chartDataByCc;
}

function appendToChartData(chartData, countryData, date) {
  // 전일 데이터가 없는 경우 현재 날짜 데이터를 그대로 사용
  if (chartData.date.length === 0) {
    chartData.confirmed.push(countryData.confirmed);
    chartData.death.push(countryData.death);
    chartData.released.push(countryData.released);
  } else {
    // 전일 대비 증가량을 저장
    const confirmedIncrement =
      countryData.confirmed - _.last(chartData.confirmedAcc) || 0;
    chartData.confirmed.push(confirmedIncrement);

    const deathIncrement = countryData.death - _.last(chartData.deathAcc) || 0;
    chartData.death.push(deathIncrement);

    const releasedIncrement =
      countryData.released - _.last(chartData.releasedAcc) || 0;
    chartData.released.push(releasedIncrement);
  }

  chartData.confirmedAcc.push(countryData.confirmed);
  chartData.deathAcc.push(countryData.death);
  chartData.releasedAcc.push(countryData.released);

  chartData.date.push(date);
}

module.exports = {
  getDataSource,
};
