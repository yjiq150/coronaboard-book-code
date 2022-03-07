import React from 'react';
import { css } from '@emotion/react';
import { Slide } from './slide';
import { KoreaTestChart } from './chart/korea-test-chart';
import { KoreaBySexChart } from './chart/korea-by-sex-chart';
import { KoreaByAgeChart } from './chart/korea-by-age-chart';

export function KoreaChartSlide(props) {
  const { id, dataSource } = props;
  const {
    koreaTestChartData,
    koreaBySexChartData,
    koreaByAgeChartData,
  } = dataSource;

  return (
    <Slide id={id} title="국내 차트">
      <div
        css={css`
          .card {
            margin-top: 20px;
          }
        `}
      >
        <KoreaTestChart koreaTestChartData={koreaTestChartData} />
        <KoreaBySexChart koreaBySexChartData={koreaBySexChartData} />
        <KoreaByAgeChart koreaByAgeChartData={koreaByAgeChartData} />
      </div>
    </Slide>
  );
}
