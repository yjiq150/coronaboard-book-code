import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Echart } from '../../components/echart'; // ❶
import { css } from '@emotion/react';

export default function PieChart() {
  // ❷ 파이 차트를 그리기 위한 데이터
  const pieChartData = [
    { name: '여성', value: 76708 },
    { name: '남성', value: 77749 },
  ];

  // 각 데이터로부터 총 합을 계산
  const total = pieChartData.reduce((acc, x) => acc + x.value, 0);

  // ❸ 차트 타입, 레이블, 실제 데이터를 제공
  const series = [
    {
      label: {
        position: 'outer',
        formatter: (obj) => {
          const percent = ((obj.value / total) * 100).toFixed(1);
          return `${obj.name} ${obj.value}명\n(${percent}%)`;
        },
      },
      type: 'pie',
      radius: '50%',
      data: pieChartData,
    },
  ];

  // ❹ 차트를 그리는데 필요한 모든 옵션들을 하나의 객체에 모아서 정의
  const chartOption = {
    animation: true,
    title: {
      text: '대한민국 성별 확진자 현황',
      left: 'center',
      top: 30,
    },
    legend: {
      data: pieChartData.map((x) => x.name),
      bottom: 20,
    },
    series,
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
