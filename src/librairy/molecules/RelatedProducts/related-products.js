import { H3, Thumbnail } from "@librairy/atoms"
import Link from "next/link"
import { v4 as uuid } from 'uuid';

export const RelatedProdducts = ({ themes, productName }) => {
  return (
    <section className="related-products">
        <H3>Vous aimerez peut-être aussi</H3>
        <div className="shop-cards">
          {
            themes.map(theme => {
              return (
                theme.relatedProducts.map(relatedProduct => {
                  if (relatedProduct.name != productName) return (
                    <article className="shop-card" key={uuid()}>
                      <Link href={`/boutique/produits/${relatedProduct.slug}`}>
                        <a><Thumbnail src={relatedProduct.thumbnail} alt={`Photo : ${relatedProduct.name}`} /></a>
                      </Link>
                      <div className="shop-card-infos">
                        <Link href={`/boutique/produits/${relatedProduct.slug}`}>
                          <a className="shop-card-infos--title">{relatedProduct.name}</a>
                        </Link>
                        <span className='shop-card-infos--price'>{relatedProduct.price} €</span>
                        <span className='shop-card-infos--stock'>{ relatedProduct.isAvailable ? 'En stock' : 'Rupture'}</span>                   
                      </div>
                    </article>
                  )
                })
              )
            })
          }            
        </div>
  </section>
  )
}