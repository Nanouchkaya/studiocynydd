import { ButtonSecondary, Thumbnail } from "@librairy/atoms";
import { v4 as uuid } from 'uuid';

export const ShopCards = ({ cardsData }) => (
  <section className="shop-cards">
    { cardsData.map(currentCard => (
      <article className="shop-card" key={uuid()}>
        <Thumbnail src={currentCard.thumbnail} alt={currentCard.title} />
        <ButtonSecondary href={currentCard.url}>{currentCard.title}</ButtonSecondary>
      </article>
      ))
    }
  </section>
)