const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const { format, utcToZonedTime } = require('date-fns-tz');
const GlobalCrawler = require('./global-crawler');

async function crawlAndUpdateGlobal(outputPath, apiClient) {
  let prevData = {};
  const globalStatPath = path.join(outputPath, 'global-stat.json');
  try {
    prevData = JSON.parse(fs.readFileSync(globalStatPath, 'utf-8'));
  } catch (e) {
    console.log('previous globalStat not found');
  }

  const globalCrawler = new GlobalCrawler();

  const now = new Date();
  const timeZone = 'Asia/Seoul';
  const crawledDate = format(utcToZonedTime(now, timeZone), 'yyyy-MM-dd');

  const newData =  {
    crawledDate,
    globalStat: await globalCrawler.crawlStat(),
  };

  if (_.isEqual(newData, prevData)) {
    console.log('globalStat has not been changed');
    return;
  }

  fs.writeFileSync(globalStatPath, JSON.stringify(newData));

  const newGlobalStat = newData.globalStat
  // API 서버에서 모든 데이터를 조회한 후 현재 날짜의 데이터만 필터링
  const resp = await apiClient.findAllGlobalStat();
  const oldRows = resp.result.filter((x) => x.date === crawledDate);
  const oldGlobalStat = _.keyBy(oldRows, 'cc');

  // 크롤링한 데이터와 API 서버의 데이터를 비교하여 변경 부분만 추출
  const updatedRows = findUpdatedRows(newGlobalStat, oldGlobalStat);
  if (_.isEmpty(updatedRows)) {
    console.log('No updated globalStat rows');
    return;
  }

  // 변경 부분을 API 서버에 업데이트
  for (const row of updatedRows) {
    await apiClient.upsertGlobalStat({
      date: crawledDate,
      ...row,
    });
  }

  console.log('globalStat updated successfully');
}

function findUpdatedRows(newRowsByCc, oldRowsByCc) {
  const updatedRows = [];
  for (const cc of Object.keys(newRowsByCc)) {
    const newRow = newRowsByCc[cc];
    const oldRow = oldRowsByCc[cc];

    // 한국의 경우 DomesticCrawler를 사용하여 데이터를 업데이트를 진행하기 때문에
    // 기존 데이터가 존재한다면 업데이트를 생략
    if (cc === 'KR' && oldRow) {
      continue;
    }

    if (isRowEqual(newRow, oldRow)) {
      continue;
    }

    updatedRows.push(newRow);
  }

  return updatedRows;
}

function isRowEqual(newRow, prevRow) {
  const colsToCompare = [
    'confirmed',
    'death',
    'released',
    'critical',
    'tested',
  ];
  // 서버에 데이터가 없는 경우 다른 것으로 취급
  if (!prevRow) {
    return false;
  }
  return colsToCompare.every((col) => newRow[col] === prevRow[col]);
}

module.exports = { crawlAndUpdateGlobal };
