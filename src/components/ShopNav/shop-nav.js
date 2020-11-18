import { H3, ListLink } from "@librairy/atoms";
import { v4 as uuid } from 'uuid';

export const ShopNav = ({ categories }) => {
  return (
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
              categories.map(category =>
              <ListLink
                key={uuid()}
                href={`/boutique/categories/${encodeURIComponent(category.slug)}`}
              >
                {category.title}
              </ListLink>)
            }   
            </ul>
          </article>
        </div>
      </aside>
  )
}

// href={{
//  pathname: '/boutique/categories/[slug]',
//  query: { id: category.id, slug: category.slug },
//}}