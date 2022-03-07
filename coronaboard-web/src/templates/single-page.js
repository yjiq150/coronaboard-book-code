import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { css } from '@emotion/react';
import { Dashboard } from '../components/dashboard';
import { Notice } from '../components/notice';
import { Navigation } from '../components/navigation';
import { GlobalSlide } from '../components/global-slide';
import { GlobalChartSlide } from '../components/global-chart-slide';
import { KoreaChartSlide } from '../components/korea-chart-slide';
import { Footer } from '../components/footer';
import { YoutubeSlide } from '../components/youtube-slide';
import HelmetWrapper from '../components/helmet-wrapper';

export default function SinglePage({ pageContext }) {
  const { dataSource } = pageContext;
  const { lastUpdated, globalStats, notice } = dataSource;
  // 사용자의 언어/지역 설정에 맞는 날짜 형태로 표시
  const lastUpdatedFormatted = new Date(lastUpdated).toLocaleString();

  useEffect(() => {
    if (window) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  });

  return (
    <div id="top">
      <HelmetWrapper title={'홈'} />
      {/* 상단 검은색 배경 만들기 */}
      <div
        css={css`
          position: absolute;
          background-color: black;
          width: 100%;
          height: 300px;
          z-index: -99;
        `}
      />
      <h1
        css={css`
          padding-top: 48px;
          padding-bottom: 24px;
          color: white;
          text-align: center;
          font-size: 28px;
        `}
      >
        코로나19(COVID-19)
        <br />
        실시간 상황판
      </h1>
      <p className="text-center text-white">
        마지막 업데이트: {lastUpdatedFormatted}
      </p>

      <Dashboard globalStats={globalStats} />
      <Notice notice={notice} />

      <div
        css={css`
          text-align: center;
        `}
      >
        {/* square01 */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-1511546096943469"
          data-ad-slot="8032452972"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>

      <Navigation />

      {/* 각 슬라이드에 지정된 id 값은 Navigation 컴포넌트 안의 Link에 지정된 to 값과 동일해야함 */}
      <GlobalSlide id="global-slide" dataSource={dataSource} />

      <iframe
        src="https://ads-partners.coupang.com/widgets.html?id=562965&template=carousel&trackingCode=AF7043751&subId=&width=100%25&height=200"
        width="100%"
        height="200"
        frameBorder="0"
        scrolling="no"
        referrerPolicy="unsafe-url"
      ></iframe>

      <GlobalChartSlide id="global-chart-slide" dataSource={dataSource} />
      <KoreaChartSlide id="korea-chart-slide" dataSource={dataSource} />
      <YoutubeSlide id="youtube-slide" dataSource={dataSource} />

      <Footer />
    </div>
  );
}
