import { getAssetById, getPageContent, getRetailers } from '@utils/contentful';
import { globalAssetsID } from '@utils/site-constants';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { options } from '@utils/rich-text-options';
import { Layout, Map } from "@librairy/organisms/index";
import { H1, Subtitle } from "@librairy/atoms";

const FindUs = ({ layout, title, description, body, retailers, token }) => {

  return (
    <Layout title={title} type="page-header" {...layout}>
    <H1>{title}</H1>
    <Subtitle>{description}</Subtitle>
    <section id="about">
      {documentToReactComponents(body, options)}
      <Map positions={retailers} token={token} />
    </section>
    </Layout>
  )
}

export default FindUs;

export async function getStaticProps() {
  const content = await getPageContent('1N4lovFHrIg0KTWktA65TQ');
  return {
    props: {
      layout: {
        sitePhoto: await getAssetById(globalAssetsID.sitePhoto),
        herologo: await getAssetById(globalAssetsID.herologo),
        labelFooter: {
          livraison: await getAssetById(globalAssetsID.livraison),
          paiement: await getAssetById(globalAssetsID.paiement),
          creationFr: await getAssetById(globalAssetsID.creationFr),
        },
      },
      title: content?.title ?? null,
      description: content?.description ?? null,
      body: content?.body ?? null,
      retailers: [...await getRetailers()],
      token: process.env.MAPBOX_TOKEN,
    }
  }
}