import { getAssetById, getPageContent } from '@utils/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { options } from '@utils/rich-text-options';
import { Layout } from "@components/Layout";
import { H1, Subtitle } from "@librairy/atoms";

const Contact = ({ herologo, title, description, body }) => {
 // console.log(body)
  return (
    <Layout title={title} type="page-header" herologo={herologo}>
    <H1>{title}</H1>
    <Subtitle>{description}</Subtitle>
    <section className="collaborations">
    {documentToReactComponents(body, options)}
    </section>
    </Layout>
  )
}

export default Contact;

export async function getStaticProps() {
  const data = await getPageContent('1rZqlALNXNFilrZXeQNRJp');
  return {
    props: {
      herologo: await getAssetById('13trf7K2jrx5M7fWiW5pbo'),
      title: data?.title ?? null,
      description: data?.description ?? null,
      body: data?.body ?? null,
    }
  }
}