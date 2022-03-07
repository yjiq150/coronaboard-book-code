import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

function HelmetWrapper({ title, description }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            image
            siteUrl
          }
        }
      }
    `,
  );

  const { siteMetadata } = site;
  const metaDescription = description || siteMetadata.description;

  return (
    <Helmet
      title={title}
      titleTemplate={`%s | ${siteMetadata.title}`}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:url',
          content: siteMetadata.siteUrl,
        },
        {
          property: 'og:image',
          content: siteMetadata.image,
        },
        {
          property: 'og:type',
          content: 'website',
        },
      ]}
    >
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1511546096943469"
        crossOrigin="anonymous"
      ></script>
    </Helmet>
  );
}

HelmetWrapper.defaultProps = {
  description: null,
};

HelmetWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default HelmetWrapper;
