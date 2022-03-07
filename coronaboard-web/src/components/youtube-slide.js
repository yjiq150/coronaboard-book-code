import React from 'react';
import { css } from '@emotion/react';
import { Slide } from './slide';
import { numberWithUnitFormatter } from '../utils/formatter';

export function YoutubeSlide(props) {
  const { id, dataSource } = props;
  const { youtubeVideos } = dataSource;

  return (
    <Slide id={id} title="관련 유튜브 영상">
      {youtubeVideos.map((video) => (
        <a
          key={video.videoUrl}
          className="text-decoration-none text-reset"
          href={video.videoUrl}
        >
          <div className="d-flex flex-wrap flex-md-nowrap border-bottom">
            <img src={video.thumbnail} alt={video.title} />
            <div
              css={css`
                padding: 10px;
                text-align: left;

                .title {
                  font-size: 18px;
                  line-height: 1.4rem;
                  margin-bottom: 10px;
                }

                .meta {
                  font-size: 14px;
                  color: gray;
                  word-break: break-word;
                }
              `}
            >
              <div className="title">{video.title}</div>
              <div className="meta">
                {video.channelTitle}• 조회수
                {numberWithUnitFormatter(video.viewCount)}• {video.publishedAt}
                <br />
                {video.description}
              </div>
            </div>
          </div>
        </a>
      ))}
    </Slide>
  );
}
