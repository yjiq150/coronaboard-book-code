import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Chart } from 'react-google-charts';

export default function GoogleGeoChart2() {
  const data = [
    ['City', 'City', '확진자', '사망자'],
    ['KR-11', '서울', 47695, 507],
    ['KR-26', '부산', 6034, 124],
    ['KR-27', '대구', 10517, 222],
    ['KR-28', '인천', 6553, 61],
    ['KR-29', '광주', 2888, 23],
    ['KR-30', '대전', 2437, 27],
    ['KR-31', '울산', 2732, 40],
    ['KR-50', '세종', 525, 1],
    ['KR-41', '경기', 42324, 650],
    ['KR-42', '강원', 3411, 52],
    ['KR-43', '충북', 3232, 69],
    ['KR-44', '충남', 3703, 41],
    ['KR-45', '전북', 2319, 58],
    ['KR-46', '전남', 1582, 15],
    ['KR-47', '경북', 4849, 86],
    ['KR-48', '경남', 5097, 20],
    ['KR-49', '제주', 1230, 1],
  ];

  const options = {
    colorAxis: { minValue: 0, maxValue: 50000, colors: ['#ffffff', '#710000'] },
    region: 'KR',
    resolution: 'provinces',
  };
  return (
    <Container>
      <Chart
        chartType="GeoChart"
        width="100%"
        height="100%"
        data={data}
        options={options}
      />
    </Container>
  );
}
