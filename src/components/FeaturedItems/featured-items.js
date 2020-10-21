import { v4 as uuid } from 'uuid';
import { ProductCategory } from "@librairy/molecules/Category"
import { H2, Subtitle } from '@librairy/atoms';


export const FeaturedItems = ({ categories }) => {
  
  //console.log(categories)
  return (
    <section className="featured-items">
      <H2>Catégories en vedette</H2>
      <Subtitle>Les stars du moment</Subtitle>
      <div className="cards">
        { categories.map(category => <ProductCategory key={uuid()} url={category.url} image={category.image.url} name={category.title} />) }
      </div>
    </section>
  )
}


// const categories = [
  //   {
  //     title: 'Cartes à planter',
  //     image: '/images/cat_papeterie.jpg',
  //     description: 'Cartes à planter',
  //     link: ''
  //   },
  //   {
  //     title: 'Univers bébé',
  //     image: '/images/cat_cap.jpg',
  //     description: 'Cartes à planter',
  //     link: ''
  //   },
  //   {
  //     title: 'Affiches bébé',
  //     image: '/images/cat_affiche-perso.jpg',
  //     description: 'Cartes à planter',
  //     link: ''
  //   },
  //   {
  //     title: 'Affiches à personnaliser',
  //     image: '/images/cat_affiche-bebe.jpg',
  //     description: 'Cartes à planter',
  //     link: ''
  //   },
  //   {
  //     title: 'Papeterie',
  //     image: '/images/cat_bebe.jpg',
  //     description: 'Cartes à planter',
  //     link: ''
  //   },
  // ];