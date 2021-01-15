import { getAssetById, getProductDetails, getProducts } from "@utils/contentful";
import { H1, H3, Paragraph, Subtitle } from '@librairy/atoms';
import { Layout} from '@librairy/organisms/index';
import { Gallery } from "@organisms/Gallery";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { options } from '@utils/rich-text-options';
import { AddButton } from "@librairy/atoms/Links/buttons";
import { useState } from "react";
import { v4 as uuid } from 'uuid';
import { CardSummary } from "@librairy/molecules/CardSummary";

const ShopCategoryPage = ({ herologo, product }) => {
  const [quantity, setQuantity] = useState(1);
  const arrayOfCustomDataItem = product.variations.map((variation, index) => {
    const name = `data-item-custom${index + 1}-name`
    const options = `data-item-custom${index + 1}-options`
    const required = `data-item-custom${index + 1}-required`
      return {
        [name]: variation.fields.name,
        [options]: variation.fields.dataOptions,
        [required]: "true",
      }
  })

  let customDataItem = {}

  return (
    <Layout title="Boutique" type="page-header" herologo={herologo}>
    <CardSummary />
      <H1>La Boutique</H1>
      <Subtitle>{product.name}</Subtitle>
      <section className="product">
        <Gallery images={product.images} />
        <div className="product-infos">
          <H3>{product.name}</H3>

          <div className="product-infos-container">
            <div className="product-buy">
              <div className="product-buy-price">{product.price * quantity}€ <sup>TTC</sup></div>
              <div className="product-buy-quantity">
              <a onClick={() => setQuantity(quantity + 1)}>+ </a> <a onClick={() => setQuantity(Math.max(0, quantity - 1))}> -</a>
              </div>
            </div>

            {
              arrayOfCustomDataItem.forEach(element => {
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

            <details className="product-shipping">
              <summary>Livraison & retour</summary>
              {product.shippingMethods.map(shipping => (
                <div className="product-shipping-item">
                <h4 className="product-shipping-item-name">{shipping.fields.name}</h4>
                  {documentToReactComponents(shipping.fields.description, options)}
                </div>
              ))}
            </details>

            <details className="product-variations">
                <summary>Options disponibles</summary>
                <Paragraph label="alert">Les options sont à définir dans votre panier au moment de l'ajout de l'article.</Paragraph>
              {
                product.variations.map(variation => {
                  const hasOptions = variation.fields?.options?.length > 0;
                  return (
                    <div key={uuid()} className="product-variations-item">
                      <span className="product-variations-item-name">{variation.fields.name}</span>
                      { hasOptions && (
                        <ul className="options-list">
                            {variation.fields.options.map(option => (
                              <li key={uuid()} className="options-list-item">{option}</li>
                            ))}
                        </ul>
                        )
                      }
                      { !hasOptions && <Paragraph>Aucune option disponible pour cet article.</Paragraph> }         
                    </div>
                  )
                })
              }
            </details>

          <div className="product-tags">
            {
              product.tags.map(tag => <span key={uuid()} className="product-tags-item">{tag}</span>)
            }
          </div>
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
    { params: { slug: 'carte-a-planter-marraine' } } //product.slug
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