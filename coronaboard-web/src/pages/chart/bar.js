import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Echart } from '../../components/echart'; // ❶
import { css } from '@emotion/react';

export default function BarChart() {
  // ❷ 레이블 표시 여부, 위치를 설정
  const labelOptions = {
    show: true,
    position: 'top',
  };

  // ❸ 데이터의 이름, 차트 타입, 색상, 레이블, 실제 데이터를 제공
  const series = [
    {
      name: '확진',
      type: 'bar',
      color: '#e2431e',
      label: labelOptions,
      data: [743, 556, 485, 454, 602],
    },
    {
      name: '격리해제',
      type: 'bar',
      color: '#6f9654',
      label: labelOptions,
      data: [474, 499, 599, 551, 762],
    },
  ];

  // ❹ 차트를 그리는데 필요한 모든 옵션들을 하나의 객체에 모아서 정의
  const chartOption = {
    title: {
      text: '대한민국 코로나 19 추이',
      left: 'center',
    },
    legend: {
      data: series.map((x) => x.name),
      bottom: 20,
    },
    xAxis: {
      data: ['6.5', '6.6', '6.7', '6.8', '6.9'],
    },
    yAxis: {},
    tooltip: {
      trigger: 'axis',
    },
    series,
    animation: false,
  };

  return (
    <Container>
      {/* ❺ 차트가 그려질 영역의 크기와 정의해둔 차트 옵션을 컴포넌트에 전달 */}
      <Echart
        wrapperCss={css`
          width: 100%;
          height: 400px;
        `}
        option={chartOption}
      />
    </Container>
  );
}
