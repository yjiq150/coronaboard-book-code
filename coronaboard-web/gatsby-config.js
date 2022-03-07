module.exports = {
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-5CFLPPP',
        includeInDevelopment: false,
        defaultDataLayer: {
          platform: 'gatsby',
        },
      },
    },
  ],
  siteMetadata: {
    siteUrl: 'https://coronaboard.kr',
    title: '코로나19(COVID-19) 실시간 상황판',
    description:
      '코로나19에 관한 세계 각 국가들의 통계 및 뉴스 등을 취합하여 실시간 정보와 다양한 차트를 제공합니다',
    image: 'https://coronaboard.kr/ogimage.png',
  },
};
