import { getAssetById, getProductDetails, getProducts } from "@utils/contentful";
import { H1, H2, H3, Subtitle } from '@librairy/atoms';
import { Layout} from '@librairy/organisms/index';
import { Gallery } from "@organisms/Gallery";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { options } from '@utils/rich-text-options';
import { AddButton } from "@librairy/atoms/Links/buttons";

const ShopCategoryPage = ({ herologo, product }) => {
  console.log(product)
  return (
    <Layout title="Boutique" type="page-header" herologo={herologo}>
      <H1>La Boutique</H1>
      <Subtitle>{product.name}</Subtitle>
      <section className="product">
        <Gallery images={product.images} />
        <div className="product-infos">
          <H3>{product.name}</H3>
          <div className="product-infos-container">
            <div className="product-buy">
              <span className="product-price">{product.price}€</span>
              <AddButton {...product} />
            </div>
            <details className="product-description">
              <summary>Détails de l'article</summary>
              {documentToReactComponents(product.description, options)}
            </details>
          </div>
        </div>
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