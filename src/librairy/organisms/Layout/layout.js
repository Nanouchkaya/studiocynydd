import PropTypes from "prop-types";
import { Header, Footer } from "@librairy/organisms/index"; 
import Head from 'next/head';
import { Anchors } from "@librairy/atoms/Links";
import { siteInfos, colors } from '@utils/site-constants';

export const Layout = ({
  children,
  title = 'Papeterie pleine de vie',
  type = "index-header",
  sitePhoto,
  herologo,
  slogan,
  labelFooter
}) => {
  return (
    <React.Fragment>
      <Head>
        <title>{`${siteInfos.name} | ${title}`}</title>
        <meta charSet="utf-8" />
        <meta name="theme-color" content={colors.cPrimary} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={siteInfos.description} />
        <meta name="author" content={siteInfos.author} />
        <meta name="keywords" content={siteInfos.keywords} />

        {/* Open Graph */}
        <meta property="og:type" content="siteweb" key="ogtype" />
        <meta property="og:url" content="https://studiocynydd.fr/" key="ogurl" />
        <meta property="og:site_name" content={siteInfos.name} key="ogsitename" />
        <meta property="og:title" content={`${siteInfos.name} | ${title}`} key="title" />        
        <meta property="og:description" content={siteInfos.description} key="description" />
        <meta property="og:image" content={sitePhoto} key="ogimage" />

        <link rel="preconnect" href="https://app.snipcart.com" />
        <link rel="preconnect" href="https://cdn.snipcart.com" />
        <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.0.26/default/snipcart.css" />
        
      </Head>
      <Header type={type} herologo={herologo} slogan={slogan} />
      <main style={{position:'relative'}}>
        {children}
        <Anchors />
      </main>
      <Footer labelFooter={labelFooter} />
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.array,
  title: PropTypes.string,
  type: PropTypes.string
}
