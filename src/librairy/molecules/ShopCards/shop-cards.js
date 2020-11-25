import { Thumbnail } from "@librairy/atoms";
import Link from "next/link";
import { v4 as uuid } from 'uuid';
import { isAfter, subDays, parseISO } from 'date-fns'

export const ShopCards = ({ cardsData }) => {
  const oneMonthBeforeToday = subDays(new Date(), 30);
  
  return (
    <section className="shop-cards">
      { cardsData.map(currentCard => (
        <article className="shop-card" key={uuid()}>
        <div className='shop-card-labels'>
        { currentCard.isDiscount && <div className="shop-card-label promo">Promo</div> }
        { isAfter(parseISO(currentCard.createdAt), oneMonthBeforeToday) && <div className="shop-card-label newproduct">Nouveau</div> }
        { currentCard.isBestSeller && <div className="shop-card-label bestseller">Best Seller</div> }
        </div>
          <Link href={currentCard.id ? `/boutique/categories/${currentCard.slug}` : `/boutique/produits/${currentCard.slug}`}>
            <a><Thumbnail src={currentCard.thumbnail} alt={`Photo : ${currentCard.title}`} /></a>
          </Link>
          <div className="shop-card-infos">
            <Link href={currentCard.id ? `/boutique/categories/${currentCard.slug}` : `/boutique/produits/${currentCard.slug}`}>
              <a className="shop-card-infos--title">{currentCard.title}</a>
            </Link>
            <span className='shop-card-infos--price'>{currentCard.price} € </span>
          </div>
        </article>
        ))
      }
    </section>
  )
}