import { getAdvertisements, getAssetById, getPageContent } from '@utils/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { options } from '@utils/rich-text-options';
import { Layout } from "@components/Layout";
import { Form, H1, Subtitle } from "@librairy/atoms";

const Contact = ({ herologo, title, description, body, advertisements }) => {
  
  return (
    <Layout title={title} type="page-header" herologo={herologo} advertisements={advertisements}>
    <H1>{title}</H1>
    <Subtitle>{description}</Subtitle>
    <section id="about">
      {documentToReactComponents(body, options)}
      <Form />
    </section>
    </Layout>
  )
}

export default Contact;

export async function getStaticProps() {
  const data = await getPageContent('3ImckLlh9XklSfG7eOTGs2');
  return {
    props: {
      herologo: await getAssetById('13trf7K2jrx5M7fWiW5pbo'),
      advertisements: await getAdvertisements(),
      title: data?.title ?? null,
      description: data?.description ?? null,
      body: data?.body ?? null,
    }
  }
}