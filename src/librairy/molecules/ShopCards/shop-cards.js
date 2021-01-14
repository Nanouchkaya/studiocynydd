import { Thumbnail } from "@librairy/atoms";
import { AddButtonSmall } from "@librairy/atoms/Links/buttons";
import Link from "next/link";
import { v4 as uuid } from 'uuid';

export const ShopCards = ({ cardsData }) => {
  return (
    <section className="shop-cards">
      { cardsData.map(currentCard => {
        const arrayOfCustomDataItem = currentCard.variations.map((variation, index) => {
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
        <article className="shop-card" key={uuid()}>
        <div className='shop-card-labels'>
        { currentCard.isDiscount && <div className="shop-card-label promo">Promo</div> }
        { currentCard.isNew && <div className="shop-card-label newproduct">Nouveau</div> }
        { currentCard.isBestSeller && <div className="shop-card-label bestseller">Best Seller</div> }
        </div>
          <Link href={currentCard.id ? `/boutique/categories/${currentCard.slug}` : `/boutique/produits/${currentCard.slug}`}>
            <a><Thumbnail src={currentCard.thumbnail} alt={`Photo : ${currentCard.name}`} /></a>
          </Link>
          <div className="shop-card-infos">
            <Link href={currentCard.id ? `/boutique/categories/${currentCard.slug}` : `/boutique/produits/${currentCard.slug}`}>
              <a className="shop-card-infos--title">{currentCard.name}</a>
            </Link>
            <span className='shop-card-infos--price'>{currentCard.price} € </span>
            {
              arrayOfCustomDataItem.forEach(element => {
                customDataItem = {...customDataItem, ...element}
              })
            }
            
            <AddButtonSmall
              slug={currentCard.slug}
              name={currentCard.name}
              price={currentCard.price}
              thumbnail={currentCard.thumbnail}
              {...customDataItem}
            />
          </div>
        </article>
        )})
      }
    </section>
  )
}