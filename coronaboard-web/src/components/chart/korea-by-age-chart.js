import React, { useState } from 'react';
import { css } from '@emotion/react';
import {
  numberWithCommas,
  numberWithUnitFormatter,
} from '../../utils/formatter';
import { Echart } from '../echart';
import { colors } from '../../config';
import { Button, ButtonGroup, Card } from 'react-bootstrap';

function generateChartOption(data, dataType) {
  const textByDataType = { confirmed: '확진자', death: '사망자' };

  const textByAge = {
    0: '0-9세',
    10: '10대',
    20: '20대',
    30: '30대',
    40: '40대',
    50: '50대',
    60: '60대',
    70: '70대',
    80: '80대 이상',
  };

  const ageKeys = Object.keys(data);
  const ageChartData = ageKeys.map((ageKey) => data[ageKey][dataType]);
  const total = ageChartData.reduce((acc, x) => acc + x, 0);

  const series = [
    {
      color: colors[dataType],
      type: 'bar',
      label: {
        show: true,
        position: 'top',
        formatter: (obj) => {
          const percent = ((obj.value / total) * 100).toFixed(1);
          return `${numberWithCommas(obj.value)}명\n(${percent}%)`;
        },
      },
      data: ageChartData,
    },
  ];

  return {
    animation: true,
    title: {
      text: '대한민국 연령별 확진자 현황',
      subtext: `총 ${textByDataType[dataType]} 수 ${numberWithCommas(total)}명`,
      left: 'center',
    },
    grid: {
      left: 40,
      right: 20,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        rotate: 30,
        formatter: numberWithUnitFormatter,
      },
    },
    xAxis: {
      type: 'category',
      data: ageKeys.map((ageKey) => textByAge[ageKey]),
      axisLabel: {
        interval: 0, // x축에 눈금마다 표시되는 레이블이 생략되지 않도록 설정
        rotate: 30,
      },
    },
    series,
  };
}

export function KoreaByAgeChart(props) {
  const { koreaByAgeChartData } = props;
  const [dataType, setDataType] = useState('confirmed');
  const chartOption = generateChartOption(koreaByAgeChartData, dataType);

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
