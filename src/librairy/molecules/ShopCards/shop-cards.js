import { ButtonSecondary, Thumbnail } from "@librairy/atoms";
import { v4 as uuid } from 'uuid';

export const ShopCards = ({ cardsData }) => (
  <section className="shop-cards">
    { cardsData.map(currentCard => (
      <article className="shop-card" key={uuid()}>
        <ButtonSecondary href={currentCard.id ? `/boutique/categories/${currentCard.slug}` : `/boutique/produits/${currentCard.slug}`}>{currentCard.title}</ButtonSecondary>
        <Thumbnail src={currentCard.thumbnail} alt={currentCard.title} />
      </article>
      ))
    }
  </section>
)