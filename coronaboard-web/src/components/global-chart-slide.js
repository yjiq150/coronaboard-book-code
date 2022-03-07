import React from 'react';
import { css } from '@emotion/react';
import { Slide } from './slide';
import { GlobalTrendChart } from './chart/global-trend-chart';

export function GlobalChartSlide(props) {
  const { id, dataSource } = props;
  const { countryByCc } = dataSource;

  return (
    <Slide id={id} title="글로벌 차트">
      <div
        css={css`
          .card {
            margin-top: 20px;
          }
        `}
      >
        {/* 단일 국가 선택, 누적/일별 차트 */}
        <GlobalTrendChart countryByCc={countryByCc} />
      </div>
    </Slide>
  );
}
