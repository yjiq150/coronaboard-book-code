import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import {
  convertToMonthDay,
  numberWithUnitFormatter,
} from '../../utils/formatter';
import { Echart } from '../echart';
import { Button, ButtonGroup, Card } from 'react-bootstrap';
import Select from 'react-select';
import axios from 'axios';
import { colors } from '../../config';

function generateChartOption(data, dataType) {
  const seriesAccList = [
    {
      name: '누적확진',
      type: 'line',
      data: data.confirmedAcc,
      color: colors.confirmed,
    },
    {
      name: '누적사망',
      type: 'line',
      data: data.deathAcc,
      color: colors.death,
    },
    {
      name: '누적격리해제',
      type: 'line',
      data: data.releasedAcc,
      color: colors.released,
    },
  ];

  const seriesDailyList = [
    {
      name: '확진',
      type: 'bar',
      data: data.confirmed,
      color: colors.confirmed,
    },
    {
      name: '사망',
      type: 'bar',
      data: data.death,
      color: colors.death,
    },
    {
      name: '격리해제',
      type: 'bar',
      data: data.released,
      color: colors.released,
    },
  ];

  let legendData;
  let series;
  let dataZoomStart;

  if (dataType === 'acc') {
    legendData = seriesAccList.map((x) => x.name);
    series = seriesAccList;
    dataZoomStart = 30;
  } else if (dataType === 'daily') {
    legendData = seriesDailyList.map((x) => x.name);
    series = seriesDailyList;
    dataZoomStart = 85;
  } else {
    throw new Error(`Not supported dataType: ${dataType}`);
  }

  return {
    animation: false,
    title: {
      text: '전세계 코로나(COVID-19) 추이',
      left: 'center',
    },
    // 차트 위로 마우스 오버 했을때 커서가 위치한 축 상에 위치한 모든 데이터의 값을 보여줌
    // (따로 설정하지 않으면 커서가 위치한 곳에 존재하는 데이터의 값만 보여줌)
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: legendData,
      bottom: 50,
    },
    // 차트가 그려지는 전체 캔버스 영역에서 상하좌우 얼마나 떨어진 곳에서 실제 차트가 그려질지 결정
    grid: {
      top: 70,
      left: 40,
      right: 10,
      bottom: 100,
    },
    dataZoom: [
      {
        type: 'slider',
        show: true,
        start: dataZoomStart,
        end: 100,
      },
    ],
    xAxis: {
      data: data.date.map(convertToMonthDay),
    },
    yAxis: {
      axisLabel: {
        rotate: 50,
        formatter: numberWithUnitFormatter,
      },
    },
    series,
  };
}

export function GlobalTrendChart(props) {
  const { countryByCc } = props;

  // ❶ 선택 상자의 기본값
  const defaultSelectedItem = {
    value: 'global',
    label: '전세계',
  };
  // ❷ 상태 변수 정의
  // 실제 차트를 그리기 위해 필요한 데이터
  const [chartData, setChartData] = useState(null);
  // 누적(acc), 일별(daily) 선택 여부
  const [dataType, setDataType] = useState('acc');
  // 선택 상자에서 현재 선택된 항목
  const [selectedItem, setSelectedItem] = useState(defaultSelectedItem);

  const countryCodes = Object.keys(countryByCc);

  useEffect(() => {
    // 선택된 국가가 변경될 때 해당 국가에 대한 차트 데이터를 동적으로 로드
    async function fetchDataWithCc(cc) {
      const response = await axios.get(`/generated/${cc}.json`);
      setChartData(response.data);
    }
    fetchDataWithCc(selectedItem.value);
  }, [selectedItem]);

  // 데이터가 아직 준비되지 않은 경우에는 Loading 화면을 노출
  if (!chartData) {
    return <div>Loading</div>;
  }

  const chartOption = generateChartOption(chartData, dataType);
  // 선택 상자에 사용할 국가 코드와 국가 이름 데이터를 생성
  const selectOption = [
    defaultSelectedItem,
    ...countryCodes.map((cc) => ({
      value: cc,
      label: countryByCc[cc].title_ko,
    })),
  ];

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

        <div className="d-flex justify-content-center">
          <ButtonGroup
            size="sm"
            css={css`
              padding: 0 10px;
            `}
          >
            <Button
              variant="outline-primary"
              // 상태 변수의 값에 따라 버튼의 액티브 상태를 결정
              active={dataType === 'acc'}
              onClick={() => setDataType('acc')}
            >
              누적
            </Button>
            <Button
              variant="outline-primary"
              active={dataType === 'daily'}
              onClick={() => setDataType('daily')}
            >
              일별
            </Button>
          </ButtonGroup>
          <Select
            styles={{
              container: (provided) => ({
                ...provided,
                width: '160px',
              }),
              menu: (provided) => ({
                ...provided,
                width: '160px',
              }),
            }}
            value={selectedItem}
            onChange={(selected) => {
              setSelectedItem(selected);
            }}
            options={selectOption}
          />
        </div>
      </Card.Body>
    </Card>
  );
}
