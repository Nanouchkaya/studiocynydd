import { getAssetById, getPageContent, getRetailers } from '@utils/contentful';
import { globalAssetsID } from '@utils/site-constants';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { options } from '@utils/rich-text-options';
import { Layout, Map } from "@components/index";
import { H1, Subtitle } from "@librairy/atoms";

const FindUs = ({ herologo, title, description, body, retailers, token }) => {

  return (
    <Layout title={title} type="page-header" herologo={herologo}>
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
      herologo: await getAssetById(globalAssetsID.herologo),
      title: content?.title ?? null,
      description: content?.description ?? null,
      body: content?.body ?? null,
      retailers: [...await getRetailers()],
      token: process.env.MAPBOX_TOKEN,
    }
  }
}