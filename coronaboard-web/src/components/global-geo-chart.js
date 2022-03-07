import React from 'react';
import { Chart } from 'react-google-charts';

export function GlobalGeoChart(props) {
  const { countryByCc, globalStats } = props;

  const header = ['국가', '국가', '확진자', '사망자'];
  const rows = globalStats.map((x) => {
    const country = countryByCc[x.cc];
    const countryTitle = country.title_ko + country.flag;
    return [x.cc, countryTitle, x.confirmed, x.death];
  });

  const geoChartData = [header, ...rows];

  return (
    <div>
      <Chart
        chartType="GeoChart"
        width="100%"
        height="100%"
        data={geoChartData}
        options={{
          colorAxis: { colors: ['#fff2f2', '#710000'] },
          legend: 'none', // 범례를 숨김
        }}
      />
    </div>
  );
}
