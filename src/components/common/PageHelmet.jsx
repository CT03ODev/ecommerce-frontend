import { Helmet } from 'react-helmet';

function PageHelmet({ title, description }) {
  const siteTitle = 'Ecommerce Store';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
}

export default PageHelmet;