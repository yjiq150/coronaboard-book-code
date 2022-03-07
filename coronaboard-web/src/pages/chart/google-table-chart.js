import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Chart } from 'react-google-charts'; // ❶

export default function GoogleTableChart() {
  // ❷ 각 열에 표시되는 데이터 타입, 제목을 명시
  const header = [
    { type: 'string', label: '지역' },
    { type: 'number', label: '확진자' },
    { type: 'number', label: '사망자' },
    { type: 'number', label: '격리해제' },
    { type: 'number', label: '치명률' },
  ];

  const rows = [
    ['서울', 22717, 277, 17487],
    ['경기', 18378, 393, 14538],
    ['대구', 8176, 206, 7787],
  ];

  const fatalityRateAddedRows = rows.map((row) => {
    const [region, confirmed, death, released] = row;

    const confirmedFormatted = {
      v: confirmed,
      f: `${confirmed}<br><span class="text-danger">(+101)</span>`,
    };

    const releasedFormatted = {
      v: released,
      f: `${released}<br><span class="text-success">(+30)</span>`,
    };

    const fatalityRate = (death / confirmed) * 100;
    const fatalityRateFormatted = {
      v: fatalityRate,
      f: `${fatalityRate.toFixed(1)}%`,
    };
    return [
      region,
      confirmedFormatted,
      death,
      releasedFormatted,
      fatalityRateFormatted,
    ];
  });

  const data = [header, ...fatalityRateAddedRows];

  return (
    <Container>
      <Chart
        chartType="Table"
        loader={<div>로딩중</div>} // ❹ 테이블이 로딩되는 동안 보여줄 요소
        data={data}
        options={{
          showRowNumber: true, // 행 번호를 표시하는 열을 추가
          allowHtml: true,
          width: '100%',
          height: '100%',
        }}
      />
    </Container>
  );
}
