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
      
      console.log(currentCard)
        return (
        <article className="shop-card" key={uuid()}>
        <div className='shop-card-labels'>
        { currentCard.isDiscount && <div className="shop-card-label promo">Promo</div> }
        { currentCard.isNew && <div className="shop-card-label newproduct">Nouveau</div> }
        { currentCard.isBestSeller && <div className="shop-card-label bestseller">Best Seller</div> }
        </div>
          <Link href={{
            pathname: `/boutique/produits/${currentCard.slug}`,
            query: { cat: currentCard.categories[0].fields.slug}
          }}>
            <a><Thumbnail src={currentCard.thumbnail} alt={`Photo : ${currentCard.name}`} /></a>
          </Link>
          <div className="shop-card-infos">
            <Link href={`/boutique/produits/${currentCard.slug}`}>
              <a className="shop-card-infos--title">{currentCard.name}</a>
            </Link>
            <span className='shop-card-infos--price'>{currentCard.price} € </span>
            <span className='shop-card-infos--stock'>{ currentCard.isAvailable ? 'En stock' : 'Rupture'}</span>
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
              weight={currentCard.weight}
              {...customDataItem}
            />
          </div>
        </article>
        )})
      }
    </section>
  )
}