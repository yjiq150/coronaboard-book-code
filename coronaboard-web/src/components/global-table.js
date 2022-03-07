import React, { useState } from 'react';
import { css } from '@emotion/react';
import { Chart } from 'react-google-charts';
import { formatDiffForTable, numberWithCommas } from '../utils/formatter';
import { Button } from 'react-bootstrap';

function compareConfirmed(x, y) {
  if (x.confirmed > y.confirmed) {
    return -1;
  } else if (x.confirmed < y.confirmed) {
    return 1;
  }
  return 0;
}

function generateDiffText(value, valuePrev, colorClassName) {
  return {
    v: value,
    f: `${numberWithCommas(value)}
        <br>
        <span class="diff ${colorClassName}">
        ${formatDiffForTable(value, valuePrev)}
        </span>
        `,
  };
}

export function GlobalTable(props) {
  const { countryByCc, globalStats } = props;
  const [isShowAll, setIsShowAll] = useState(false);

  // 확진자 많은 순으로 데이터를 정렬
  const globalStatsSorted = globalStats.sort(compareConfirmed);

  // 구글 테이블 차트에서 요구하는 데이터 형식으로 변형
  const rows = globalStatsSorted.map((x) => {
    const country = countryByCc[x.cc];
    const countryName = country.title_ko + country.flag;
    const deathRateText =
      x.death === 0 ? '-' : ((x.death / x.confirmed) * 100).toFixed(1);

    return [
      {
        v: x.cc,
        f: countryName,
      },
      generateDiffText(x.confirmed, x.confirmedPrev, 'red'),
      generateDiffText(x.death, x.deathPrev, 'red'),
      generateDiffText(x.released, x.releasedPrev, 'green'),
      {
        v: x.death / x.confirmed,
        f: deathRateText,
      },
    ];
  });

  const header = [
    { type: 'string', label: '국가' },
    { type: 'number', label: '확진자' },
    { type: 'number', label: '사망자' },
    { type: 'number', label: '격리해제' },
    { type: 'number', label: '치명(%)' },
  ];

  // 기본적으로 200개가 넘는 국가들 중 상위 20개만 노출
  // 사용자가 '전체 보기' 버튼을 클릭하면 그때 전체 국가들을 모두 보여줌
  const tableData = [header, ...(isShowAll ? rows : rows.slice(0, 20))];

  return (
    <div
      css={css`
          // PC에서 테이블이 불필요하게 크게 보이는 것을 제한
          max-width: 640px;
          margin: 20px auto;

          .diff.green {
            color: green;
          }

          .diff.red {
            color: red;
          }

          // 구글 테이블 차트의 기본 스타일을 변경
          .google-visualization-table-tr-head th {
            background-image: none;
            background-color: #f8f9fa;
            padding: 14px 4px;
            border-bottom: 2px solid #dee2e6;
          }

          .google-visualization-table-td {
            vertical-align: top;
          }

          button {
            display: block;
            width: 100%;
            margin-top: 8px;
            border-radius: 0;
        `}
    >
      <Chart
        chartType="Table"
        loader={<div>로딩중</div>}
        data={tableData}
        options={{
          showRowNumber: true,
          width: '100%',
          height: '100%',
          allowHtml: true,
          cssClassNames: {},
        }}
      />
      {!isShowAll ? (
        <Button variant="secondary" onClick={() => setIsShowAll(true)}>
          전체 보기
        </Button>
      ) : null}
    </div>
  );
}
