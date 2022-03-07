import React from 'react';
import { css } from '@emotion/react';
import { formatDiff, numberWithCommas } from '../utils/formatter';

export function DashboardItem(props) {
  const { text, current, prev, diffColor, unit } = props;

  const finalDiffColor = diffColor ? diffColor : 'red';
  const formattedNumber =
    unit === 'percent' ? `${current.toFixed(2)}%` : numberWithCommas(current);

  return (
    <div
      css={css`
        font-size: 15px;
        position: relative;
      `}
    >
      <p
        css={css`
          font-size: 22px;
          font-weight: 500;
          @media (max-width: 576px) {
            font-size: 20px;
          }
        `}
      >
        {formattedNumber}
      </p>
      {prev ? (
        <p
          css={css`
            // diff에 해당하는 엘리먼트가 없는 경우에도 레이아웃이 그대로 유지되도록 처리하기 위해 사용
            position: absolute;
            top: 24px;
            width: 100%;
            color: ${finalDiffColor};
          `}
        >
          {formatDiff(current, prev)}
        </p>
      ) : null}
      <p>{text}</p>
    </div>
  );
}
