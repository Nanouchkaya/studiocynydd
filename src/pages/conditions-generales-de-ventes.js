import { getAssetById, getPageContent } from '@utils/contentful';
import { globalAssetsID } from '@utils/site-constants';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { options } from '@utils/rich-text-options';
import { Layout } from "@librairy/organisms/Layout";
import { H1, Subtitle } from "@librairy/atoms";

export const About = ({ layout, title, description, body }) => {
  return (
    <Layout title={title} type="page-header" {...layout}>
    <H1>{title}</H1>
    <Subtitle>{description}</Subtitle>
    <section id="about">
      {documentToReactComponents(body, options)}
    </section>
    </Layout>
  )
}

export default About;

export async function getStaticProps() {
  const data = await getPageContent('2o6aDEKymmXqBgVaM8QjQt');
  return {
    props: {
      layout: {
        herologo: await getAssetById(globalAssetsID.herologo),
        labelFooter: {
          livraison: await getAssetById(globalAssetsID.livraison),
          paiement: await getAssetById(globalAssetsID.paiement),
          creationFr: await getAssetById(globalAssetsID.creationFr),
        },
      },
      title: data?.title ?? null,
      description: data?.description ?? null,
      body: data?.body ?? null,
    }
  }
}