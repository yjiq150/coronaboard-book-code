import React from 'react';
import { css } from '@emotion/react';

export function Notice(props) {
  const { notice } = props;

  return (
    <div
      css={css`
        padding-top: 20px;
        text-align: center;
      `}
    >
      <h2
        css={css`
          font-size: 20px;
        `}
      >
        [공지사항]
      </h2>
      {notice.map((x, idx) => (
        <p key={idx}>{x.message}</p>
      ))}
    </div>
  );
}
