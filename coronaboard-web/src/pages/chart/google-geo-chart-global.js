import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Chart } from 'react-google-charts';

export default function GoogleGeoChartGlobal() {
  const data = [
    ['Country', 'Confirmed'],
    ['United States', 34321093],
    ['India', 29506328],
    ['Brazil', 17413996],
    ['France', 5740665],
    ['Turkey', 5330447],
  ];

  const options = {
    colorAxis: { colors: ['skyblue', 'purple'] },
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
