import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export function Echart(props) {
  const { wrapperCss, option } = props;
  // ❶ 차트가 그려질 DOM 엘리먼트를 참조할 레퍼런스를 생성
  const chartRef = useRef(null);

  // ❷ 의존하고있는 상태 변수 (props 포함)가 변경될 때마다 호출됨
  useEffect(() => {
    // ❸ echarts를 초기화 (❺에서 정의한 DOM 엘리먼트를 기준으로 사용)
    const chartInstance = echarts.init(chartRef.current);
    chartInstance.setOption(option);

    // ❹ 의존하고있는 상태 변수가 바뀌거나 현재 컴포넌트가 DOM에서 제거될 때(unmount)
    // 사용중인 리소스를 정리 하기 위한 클린업 함수를 정의하여 반환
    return () => {
      chartInstance.dispose();
    };
  }, [option]);

  // ❺ 실제 차트가 그려질 DOM 엘리먼트
  return <div css={wrapperCss} ref={chartRef} />;
}
