import { getAssetById, getProductDetails, getProducts } from "@utils/contentful";
import { H1, H3, Paragraph, Subtitle } from '@librairy/atoms';
import { Layout} from '@librairy/organisms';
import { Gallery } from "@organisms/Gallery";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { options } from '@utils/rich-text-options';
import { AddButton } from "@librairy/atoms/Links/buttons";
import { useState } from "react";
import { v4 as uuid } from 'uuid';
import { CardSummary } from "@librairy/molecules/CardSummary";
import { getProductsFromTheme } from "@utils/contentful/shop";
import { globalAssetsID } from "@utils/site-constants";
import { RelatedProdducts } from "@librairy/molecules/RelatedProducts";
import { ProductVariations } from "@librairy/molecules/ProductVariations";
import { ProductShipping } from "@librairy/molecules/ProductShipping";
import { useRouter } from "next/router";
import Link from "next/link";
import { dashToSpace } from "@utils/helpers";

const ShopCategoryPage = ({ layout, product, themes }) => {
  const router = useRouter()
  const catSlug = router.query.cat ? router.query.cat : product.categories[0].fields.slug;
  const [quantity, setQuantity] = useState(1);
  const productName = product.name;

  const getArrayOfCustomDataItem = (variations) => {
    if (typeof variations != 'undefined') return (
      variations.map((variation, index) => {
        const name = `data-item-custom${index + 1}-name`
        const options = `data-item-custom${index + 1}-options`
        const required =  `data-item-custom${index + 1}-required`
          return {
            [name]: variation.fields.name,
            [options]: variation.fields.dataOptions,
            [required]: "true",
          }
      })
    )

    return []
  }

  let customDataItem = []

  return (
    <Layout title="Boutique" type="page-header" {...layout}>
    <CardSummary />
      <H1>La Boutique</H1>
      <Subtitle>{product.name}</Subtitle>

      <section className="product">
        <Gallery images={product.images} />

        <div className="product-infos">
        <nav>
          <ul className="breadcrumb">
            <li className="breadcrumb-link">
              <Link href='/boutique'>Boutique</Link>
            </li>

            <li className="breadcrumb-link">
              <Link href={{
                pathname: '/boutique',
                query: { cat: router.query.cat}
              }}>
                <a>{dashToSpace(catSlug)}</a>
              </Link>
            </li>
          </ul>
        </nav>

          <H3>{product.name}</H3>

          <Paragraph customStyle={{textAlign: 'center', fontStyle: 'italic'}}>
            {product.discount}
          </Paragraph>

          <div className="product-infos-container">
            <div className="product-buy">
              <div className="product-buy-price">{product.price * quantity}€ <sup>TTC</sup></div>
              <div className="product-buy-quantity">
              <a onClick={() => setQuantity(quantity + 1)}>+ </a> <a onClick={() => setQuantity(Math.max(0, quantity - 1))}> -</a>
              </div>
            </div>

            <Paragraph customStyle={{textAlign: 'center', padding: '0'}}>
              { product.isAvailable ? 'En stock' : 'Rupture'}
            </Paragraph>

            {
              getArrayOfCustomDataItem(product.variations).forEach(element => {
                customDataItem = {...customDataItem, ...element}
              })
            }
            
            <AddButton
              quantity={quantity}
              slug={product.slug}
              name={product.name}
              price={product.price}
              thumbnail={product.thumbnail}
              weight={product.weight}
              customizable={product.isCustomizable}
              {...customDataItem}
            />

            <details className="product-description">
              <summary>Détails de l'article</summary>
              {documentToReactComponents(product.description, options)}
            </details>

            <details className="product-faq">
              <summary>F.A.Q.</summary>
              {documentToReactComponents(product.faq, options)}
            </details>

            { product.shippingMethods.length > 0 && <ProductShipping shippingMethods={product.shippingMethods} /> }

            { typeof product.variations == 'array' && <ProductVariations variations={product.variations} />}

          <div className="product-tags">
            Tags : { product.tags.map(tag => <span key={uuid()} className="product-tags-item">{tag}</span>) }
          </div>
          </div>
        </div>
      </section>

      { themes.length > 0 && <RelatedProdducts themes={themes} productName={productName} /> }
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
      layout: {
        sitePhoto: await getAssetById(globalAssetsID.sitePhoto),
        herologo: await getAssetById(globalAssetsID.herologo),
        labelFooter: {
          livraison: await getAssetById(globalAssetsID.livraison),
          paiement: await getAssetById(globalAssetsID.paiement),
          creationFr: await getAssetById(globalAssetsID.creationFr),
        },
      },
      product: await getProductDetails(params.slug),
      themes: await getProductsFromTheme(params.slug)
    }
  }
}


