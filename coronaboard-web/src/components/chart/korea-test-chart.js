import React from 'react';
import { css } from '@emotion/react';
import {
  convertToMonthDay,
  numberWithUnitFormatter,
} from '../../utils/formatter';
import { Echart } from '../echart';
import { Card } from 'react-bootstrap';
import { colors } from '../../config';

function generateChartOption(data) {
  const series = [
    {
      name: '검사중',
      type: 'bar',
      data: data.testing,
      color: colors.testing,
      stack: 'barData', // series안의 데이터 중 stack 속성이 같은 데이터를 한 막대 그래프에 쌓아 올림
    },
    {
      name: '누적음성',
      type: 'bar',
      data: data.negative,
      color: colors.negative,
      stack: 'barData',
    },
    {
      name: '누적확진',
      type: 'bar',
      data: data.confirmed,
      color: colors.confirmed,
      stack: 'barData',
    },
    {
      name: '누적확진율',
      type: 'line',
      data: data.confirmedRate.map((x) => (x * 100).toFixed(2)),
      color: colors.confirmed,
      yAxisIndex: 1, // 이 데이터와 연결된 yAxis 설정의 인덱스를 지정
    },
  ];

  return {
    animation: false,
    title: {
      text: '대한민국 검사 현황',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      top: 70,
      left: 45,
      right: 35,
      bottom: 100,
    },
    legend: {
      data: series.map((x) => x.name),
      bottom: 50,
    },
    xAxis: {
      data: data.date.map(convertToMonthDay),
    },
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          rotate: 30,
          formatter: numberWithUnitFormatter,
        },
      },
      // yAxisIndex == 1
      {
        right: 10,
        type: 'value',
        max: (value) => {
          return Math.round(value.max) + 1;
        },
        axisLabel: {
          formatter: (value) => {
            return value + '%';
          },
        },
      },
    ],
    dataZoom: [
      {
        type: 'slider',
        show: true,
        start: 30,
        end: 100,
      },
    ],
    series,
  };
}

export function KoreaTestChart(props) {
  const { koreaTestChartData } = props;
  const chartOption = generateChartOption(koreaTestChartData);

  return (
    <Card>
      <Card.Body>
        <Echart
          wrapperCss={css`
            width: 100%;
            height: 400px;
          `}
          option={chartOption}
        />
      </Card.Body>
    </Card>
  );
}
