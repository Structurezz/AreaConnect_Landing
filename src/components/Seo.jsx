import { Helmet } from 'react-helmet-async';

const SITE_URL  = 'https://areaconnect.pro';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;
const SITE_NAME = 'AreaConnect';

/**
 * Per-page SEO tags. Overrides what index.html sets as the baseline so each
 * route in the SPA ships its own title / description / canonical / OG card.
 *
 * Props:
 *   title       — "{page} | AreaConnect" (page-specific headline)
 *   description — 150–160 chars, keyword-rich, action-oriented
 *   path        — "/features" (leading slash); builds canonical + og:url
 *   image       — absolute URL; falls back to the shared og-image.png
 *   noindex     — true for legal pages you'd rather not have crawled
 *   keywords    — optional override
 *   jsonLd      — optional schema.org object(s) emitted as application/ld+json
 */
export default function Seo({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  noindex = false,
  keywords,
  jsonLd,
}) {
  const url = `${SITE_URL}${path.startsWith('/') ? path : '/' + path}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const schemas = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      {/* Open Graph */}
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url"         content={url} />
      <meta property="og:image"       content={image} />
      <meta property="og:type"        content="website" />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:locale"      content="en_NG" />

      {/* Twitter */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />

      {schemas.map((s, i) => (
        <script type="application/ld+json" key={i}>
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
