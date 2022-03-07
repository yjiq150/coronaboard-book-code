import React, { useState } from 'react';
import { css } from '@emotion/react';
import { numberWithCommas } from '../../utils/formatter';
import { Echart } from '../echart';
import { Button, ButtonGroup, Card } from 'react-bootstrap';

function generateChartOption(data, dataType) {
  const textByDataType = { confirmed: '확진자', death: '사망자' };
  const textBySex = {
    male: '남성',
    female: '여성',
  };

  const pieChartData = Object.keys(data).map((sexKey) => ({
    name: textBySex[sexKey],
    value: data[sexKey][dataType],
  }));

  // 각 데이터로부터 총 합을 계산
  const total = pieChartData.reduce((acc, x) => acc + x.value, 0);

  // 파이 차트에 사용될 컬러 목록
  const colorPalette = ['#2f4554', '#c23531'];
  const series = [
    {
      label: {
        position: 'inner',
        formatter: (obj) => {
          const percent = ((obj.value / total) * 100).toFixed(1);
          return `${obj.name} ${numberWithCommas(obj.value)}명\n(${percent}%)`;
        },
      },
      type: 'pie',
      // 차트 영역 내에서 원형 파이의 크기를 조절
      radius: '56%',
      data: pieChartData,
    },
  ];

  return {
    animation: true,
    title: {
      text: '대한민국 성별 확진자 현황',
      subtext: `총 ${textByDataType[dataType]} 수 ${numberWithCommas(total)}명`,
      left: 'center',
    },
    legend: {
      data: pieChartData.map((x) => x.name),
      bottom: 20,
    },
    color: colorPalette,
    series,
  };
}

export function KoreaBySexChart(props) {
  const { koreaBySexChartData } = props;
  const [dataType, setDataType] = useState('confirmed');
  const chartOption = generateChartOption(koreaBySexChartData, dataType);

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
        <ButtonGroup size="md">
          <Button
            variant="outline-primary"
            active={dataType === 'confirmed'}
            onClick={() => setDataType('confirmed')}
          >
            확진자
          </Button>
          <Button
            variant="outline-primary"
            active={dataType === 'death'}
            onClick={() => setDataType('death')}
          >
            사망자
          </Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
}
