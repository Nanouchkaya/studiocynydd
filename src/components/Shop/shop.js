import { H3, ListLink } from "@librairy/atoms";
import { ShopCards } from "@librairy/molecules";
import { v4 as uuid } from 'uuid';

export const Shop = ({ categories, products }) => {
  //console.log({products})
  return (
    <section className="shop">
      <aside className="shop-navigation">
        <div className="shop-navigation-sections">
          <article className="shop-navigation-section">
            <H3>Rechercher un article</H3>
            <input type="search" placeholder="rechercher" className="searchbar" />
          </article>
          <article className="shop-navigation-section">
            <H3>Toutes les catégories</H3>
            <ul>
            {
              categories.map(category => <ListLink key={uuid()} href={`/boutique/${category.slug}`}>{category.title}</ListLink>)
            }   
            </ul>
          </article>
        </div>
      </aside>

      {
        (products.length > 0)
        ? <ShopCards cardsData={products} />
        : <ShopCards cardsData={categories} />
      }

    </section>
  )
}