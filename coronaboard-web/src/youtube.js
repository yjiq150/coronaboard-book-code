const axios = require('axios');
const TimeAgo = require('javascript-time-ago');
const ko = require('javascript-time-ago/locale/ko');
TimeAgo.addLocale(ko);
const timeAgoKorean = new TimeAgo('ko-KR');

// 구글 클라우드 콘솔을 통해 발급받은 API 키
const apiKey = 'AIzaSyAK2CO394Jy8EAHVkWAbbfb1ARI4uxtF04';

function truncateText(text, maxLength) {
  if (!text) {
    return '';
  }

  if (text.length > maxLength) {
    return text.substr(0, maxLength) + '...';
  } else {
    return ds;
  }
}

function convertModel(item) {
  const { id, snippet, statistics } = item;

  return {
    videoUrl: 'https://www.youtube.com/watch?v=' + id,

    publishedAt: timeAgoKorean.format(Date.parse(snippet.publishedAt)),
    title: snippet.title,
    channelTitle: snippet.channelTitle,
    thumbnail: snippet.thumbnails ? snippet.thumbnails.medium.url : '',
    description: truncateText(snippet.description, 80),

    viewCount: parseInt(statistics.viewCount),
  };
}

// API Docs
// 1. search ID: https://developers.google.com/youtube/v3/docs/search/list?apix_params=%7B%22part%22%3A%22id%22%2C%22q%22%3A%22%EC%9A%B0%ED%95%9C%20%ED%8F%90%EB%A0%B4%22%7D
// 2. get details: /youtube/v3/videos?id=RrcdUtFz1T0,RJDroTVhP3c,wRP8_RWGZfI,efkVSgZCzO4,29Er1UVxcxw&order=relevance&part=snippet,statistics&maxResults=5&key=AIzaSyCi8Hc_il_iQmejzzro4wDAneN4KWXQ7rM&prettyPrint=true
async function getYouTubeVideosByKeyword(keyword) {
  const searchResponse = await axios.get(
    'https://content.googleapis.com/youtube/v3/search',
    {
      params: {
        key: apiKey,
        q: keyword,
        type: 'video', // video, channel, playlist 중 하나
        part: 'id', // 검색 조건을 만족하는 비디오의 id값 만 조회
        maxResults: 3,
      },
    },
  );

  const ids = searchResponse.data.items.map((x) => x.id.videoId);

  const detailResponse = await axios.get(
    'https://content.googleapis.com/youtube/v3/videos',
    {
      params: {
        key: apiKey,
        id: ids.join(','),
        order: 'relevance',
        // snippet: 제목, 설명, 업로드 날짜 등의 비디오 정보 조회
        // statistics에는 조회수 등의 통계 정보 조회
        part: 'snippet,statistics',
      },
    },
  );

  return detailResponse.data.items.map(convertModel);
}

module.exports = {
  getYouTubeVideosByKeyword,
};
