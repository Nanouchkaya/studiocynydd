import { ButtonSecondary, Thumbnail } from "@librairy/atoms";
import Link from "next/link";
import { v4 as uuid } from 'uuid';

export const ShopCards = ({ cardsData }) => (
  <section className="shop-cards">
    { cardsData.map(currentCard => (
      <article className="shop-card" key={uuid()}>
      {
        currentCard.isBestSeller && <span className="shop-card-infos--label">Best Seller</span>
      }
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