import { getAssetById, getProductDetails, getProducts } from "@utils/contentful";
import { H1, Paragraph, Subtitle } from '@librairy/atoms';
import { Layout} from '@components/index';

const ShopCategoryPage = ({ herologo, product }) => {
  console.log(product)
  return (
    <Layout title="Boutique" type="page-header" herologo={herologo}>
      <H1>{product.name}</H1>
      <Subtitle>La Boutique</Subtitle>
      <section className="shop">
        <Paragraph label="success">Page du produit : {product.name} au prix de {product.price}</Paragraph>
      </section>
    </Layout>
  )
}

export default ShopCategoryPage;

// This function gets called at build time
export async function getStaticPaths() {
  const products = await getProducts();

  const paths = products.map((product) => (
    { params: { slug: product.slug } }
  ))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  return {
    props : {
      herologo: await getAssetById('13trf7K2jrx5M7fWiW5pbo'),
      product: await getProductDetails(params.slug),
    }
  }
}