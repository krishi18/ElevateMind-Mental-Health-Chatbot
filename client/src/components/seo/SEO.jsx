import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types'; // For type checking (recommended)
import { siteName } from '../../config/envConfig';
import { useEffect, useState } from 'react';
import { getCurrentSiteUrl } from '../../utils/getCurrentSiteUrl';

const defaultTitle = `${siteName}`;
const defaultDescription = ``;
const defaultImage = '';
const defaultAuthorName = 'Mathanraj Murugesan';

const SEO = ({
  title,
  description,
  image,
  url,
  keywords,
  locale,
  noindex,
  twitterUsername,
}) => {
  const [currentURL, setCurrentURL] = useState('');
  const defaultUrl = currentURL;

  useEffect(() => {
    setCurrentURL(getCurrentSiteUrl());
  }, []);

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
      />
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || ''} />
      <meta name="author" content={defaultAuthorName} />
      <meta name="publisher" content={defaultAuthorName} />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />{' '}
      <meta name="robots" content={noindex ? 'noindex' : 'index, follow'} />
      <meta name="language" content={locale || 'en-US'} />
      {locale && <html lang={locale} />}
      <meta property="og:title" content={title || defaultTitle} />
      <meta
        property="og:description"
        content={description || defaultDescription}
      />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={url || defaultUrl} />
      <meta property="og:site_name" content={siteName || defaultTitle} />
      {twitterUsername && (
        <meta
          name="twitter:creator"
          content={twitterUsername || '@defaultTwitterHandle'}
        />
      )}{' '}
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:image" content={image || defaultImage} />
      <meta
        name="twitter:description"
        content={description || defaultDescription}
      />
      <meta name="twitter:site" content={url || defaultUrl} />
      <link rel="canonical" href={url || defaultUrl} />
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  keywords: PropTypes.string,
  article: PropTypes.shape({
    publishedTime: PropTypes.string,
    modifiedTime: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
  noindex: PropTypes.bool,
  locale: PropTypes.string,
  twitterUsername: PropTypes.string,
};

export default SEO;
