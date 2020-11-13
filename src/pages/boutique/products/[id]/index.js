import { getAssetById } from "@utils/contentful";
import { H1, Paragraph, Subtitle } from '@librairy/atoms';
import { News, Layout} from '@components/index';

const ShopCategoryPage = ({ herologo, productDetails }) => {
  return (
    <Layout title="Boutique" type="page-header" herologo={herologo}>
      <H1>La Boutique</H1>
      <Subtitle>Découvrez toutes les créations du Studio Cynydd</Subtitle>
      <News />
      <section className="shop">
        <Paragraph label="success">Page du produit : {productDetails.name} au prix de {productDetails.price}</Paragraph>
      </section>
    </Layout>
  )
}

export default ShopCategoryPage;

// This function gets called at build time
export async function getStaticPaths() {
  const paths = [
    { params: { id: '1' } },
    { params: { id: '2' } }
  ]

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps() {
  return {
    props : {
      herologo: await getAssetById('13trf7K2jrx5M7fWiW5pbo'),
      productDetails: {name: "Carte test", "price": "5€"},
    }
  }
}