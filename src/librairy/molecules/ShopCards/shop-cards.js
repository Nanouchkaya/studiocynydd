import { Thumbnail } from "@librairy/atoms";
import { AddButtonSmall } from "@librairy/atoms/Links/buttons";
import Link from "next/link";
import { v4 as uuid } from 'uuid';

export const ShopCards = ({ cardsData }) => {

  return (
    <section className="shop-cards">
      { cardsData.map(currentCard => (
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
            <AddButtonSmall {...currentCard} />
          </div>
        </article>
        ))
      }
    </section>
  )
}