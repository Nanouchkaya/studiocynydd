import { Layout, News } from "@components/index";
import { H1, H3, Paragraph, Subtitle } from "@librairy/atoms";
import { ShopCards } from "@librairy/molecules";
import { v4 as uuid } from 'uuid';
import { getAssetById, getCategories, getProducts } from "@utils/contentful";
import { useState } from "react";

const ShopPage = ({ herologo, categories, allProducts }) => {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState('all-categories');

  const selectedCategoryProducts = allProducts.filter(product => {
    const productHasCategoryEqualToCurentSlug = product.categories.filter(category => category.fields.slug == selectedCategorySlug);
    if (selectedCategorySlug === 'all-categories'
      || productHasCategoryEqualToCurentSlug.length > 0 )
        return true;
  });

  return (
    <Layout title="Boutique" type="page-header" herologo={herologo}>
      <H1>La Boutique</H1>
      <Subtitle>Découvrez toutes les créations du Studio Cynydd</Subtitle>
      <News />
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
              <li key={uuid()}>
                <a onClick={() => setSelectedCategorySlug('all-categories')}>Voir tout</a>
              </li>
            {
              categories.map(category =>
              <li key={uuid()}>
                <a onClick={() => setSelectedCategorySlug(category.slug)}>
                  {category.title}
                </a>
              </li>)
            }   
            </ul>
          </article>
        </div>
      </aside>
      {
        (selectedCategoryProducts.length <= 0) && <Paragraph label="alert">Aucun produit dans la catégorie sélectionnée.</Paragraph>
      }
      <ShopCards cardsData={selectedCategoryProducts} />
      </section>
    </Layout>
  )
}

export default ShopPage;

export async function getStaticProps() {
  return {
    props : {
      herologo: await getAssetById('13trf7K2jrx5M7fWiW5pbo'),
      categories: await getCategories(),
      allProducts: await getProducts(),
    }
  }
}