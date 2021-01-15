import { v4 as uuid } from 'uuid';
import { FeaturedCategory } from "@librairy/molecules"
import { ButtonPrimary, H2, Subtitle } from '@librairy/atoms';


export const FeaturedItems = ({ categories }) => {
  return (
    <section className="featured-items">
      <H2>Catégories en vedette</H2>
      <Subtitle>Les stars du moment</Subtitle>
      <div className="cards">
        { categories.map(category => <FeaturedCategory key={uuid()} url={category.url} image={category.image.url} name={category.title} />) }
      </div>
      <ButtonPrimary href="/boutique">Visiter notre Boutique</ButtonPrimary>
    </section>
  )
}