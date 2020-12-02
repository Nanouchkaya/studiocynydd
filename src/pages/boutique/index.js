import PropTypes from "prop-types";
import { useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import { v4 as uuid } from 'uuid';
import { getAssetById, getCategories, getProducts } from "@utils/contentful";
import { useMediaQuery } from "@utils/hooks/media-query";
import { Layout } from "@components/index";
import { ShopCards } from "@librairy/molecules";
import { H1, H2, H3, Paragraph, Subtitle } from "@librairy/atoms";
import { BlockShopNews } from "@librairy/molecules/Blocks/ShopNews";
import { getShopNews } from "@utils/contentful/shop";

const ShopPage = ({ herologo, categories, allProducts, shopnewsdata }) => {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState('all-categories');

  const selectedCategoryProducts = allProducts.filter(product => {
    const productsInCategoryEqualToSlug = product.categories.filter(category => category.fields.slug == selectedCategorySlug);
    if (selectedCategorySlug === 'all-categories'
      || productsInCategoryEqualToSlug.length > 0 )
        return true;
  });

  const isBreakpoint = useMediaQuery(768);

  return (
    <Layout title="Boutique" type="page-header" herologo={herologo}>
      <H1>La Boutique</H1>
      <Subtitle>Découvrez toutes les créations du Studio Cynydd</Subtitle>
      <section className="shop-news">
        <H2>Nouveautés</H2>
        <Carousel
          showStatus={false}
          showThumbs={false}
          showIndicators
          autoPlay
          interval={5000}
          infiniteLoop
        >
        {
          shopnewsdata.map(slide => (
          <BlockShopNews
            {...slide}
            key={uuid()}
            />
          ))
        }
        </Carousel>
      </section>

      <H2>Catalogue</H2>
      <section className="shop">
      <aside className="shop-navigation">
        <div className="shop-navigation-sections">
          <details open={!isBreakpoint}>
            <summary>
              Filtres de recherche
            </summary>
            <div>
              <article className="shop-navigation-section">
                <H3>Rechercher un article</H3>
                <input type="search" placeholder="mots clés" className="searchbar" />
              </article>
              <article className="shop-navigation-section">
                <H3>Catégories</H3>
                <ul>
                  <li key={uuid()}>
                    <a
                      onClick={() => setSelectedCategorySlug('all-categories')}
                      className={(selectedCategorySlug === 'all-categories') ? 'shop-navigation-link active' : 'shop-navigation-link'}
                    >
                      Toutes les catégories
                    </a>
                  </li>
                  {
                    categories.map(category =>
                      <li key={uuid()}>
                        <a
                          onClick={() => setSelectedCategorySlug(category.slug)}
                          className={(selectedCategorySlug === category.slug) ? 'shop-navigation-link active' : 'shop-navigation-link'}                          
                        >
                        {category.title}
                        </a>
                      </li>)
                  }   
                </ul>
              </article>
              <article className="shop-navigation-section">
                <H3>Etiquettes</H3>
                <ul className="shop-navigation-labels">
                  <li className="shop-navigation-label">
                    <label htmlFor="bestseller"><input id="bestseller" type="checkbox" className="searchbar" />Best Seller</label>
                  </li>
                  <li className="shop-navigation-label">
                    <label htmlFor="promo"><input id="promo" type="checkbox" className="searchbar" />Promotion</label>
                  </li>
                  <li className="shop-navigation-label">
                    <label htmlFor="newproduct"><input id="newproduct" type="checkbox" className="searchbar" />Nouveau</label>
                  </li>
                </ul>
              </article>
            </div>
          </details>
        </div>
      </aside>
      {
        (selectedCategoryProducts.length <= 0)
        ? <Paragraph label="alert">Aucun produit dans la catégorie sélectionnée.</Paragraph>
        : <ShopCards cardsData={selectedCategoryProducts} />
      }      
      </section>
    </Layout>
  )
}

ShopPage.propTypes = {
  herologo: PropTypes.object,
  categories: PropTypes.array,
  allProducts: PropTypes.array,
  shopnewsdata: PropTypes.array
}

export default ShopPage;

export async function getStaticProps() {
  return {
    props : {
      herologo: await getAssetById('13trf7K2jrx5M7fWiW5pbo'),
      categories: await getCategories(),
      allProducts: await getProducts(),
      shopnewsdata: await getShopNews(),
    }
  }
}
