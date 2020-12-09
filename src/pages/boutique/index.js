import PropTypes from "prop-types";
import { useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import { v4 as uuid } from 'uuid';
import { getAssetById, getCategories, getProducts } from "@utils/contentful";
import { useMediaQuery } from "@utils/hooks/media-query";
import { Layout } from "@librairy/organisms/index";
import { ShopCards } from "@librairy/molecules";
import { H1, H2, H3, Paragraph, Subtitle } from "@librairy/atoms";
import { BlockShopNews } from "@librairy/molecules/Blocks/ShopNews";
import { getShopNews } from "@utils/contentful/shop";
import { stringCleaner } from "@utils/helpers";
import { globalAssetsID } from '@utils/site-constants';

const ShopPage = ({ herologo, categories, allProducts, shopnewsdata }) => {
  const isBreakpoint = useMediaQuery(768);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState('all-categories');
  const [searchValue, setSearchValue] = useState('');

  const selectedCategoryProducts = allProducts.filter(product => {
    const productsInCategoryEqualToSlug = product.categories.filter(category => category.fields.slug == selectedCategorySlug);

    if (selectedCategorySlug === 'all-categories'
      || productsInCategoryEqualToSlug.length > 0 )
        return true;
  });

  const searchResults = allProducts.filter(product => {
    const cleanedProductName = stringCleaner(product.name);
    const cleanedSearchValue = stringCleaner(searchValue);
    return cleanedProductName.includes(cleanedSearchValue)
  });

  const handleSearchChange = (e) => {
    setSelectedCategorySlug('all-categories');
    setSearchValue(e.target.value);
  }

  const handleCategoryNavLinkClick = (slug) => {
    setSearchValue('');
    setSelectedCategorySlug(slug);
  }

  return (
    <Layout title="Boutique" type="page-header" herologo={herologo}>
      <H1>La Boutique</H1>
      <Subtitle>Découvrez toutes les créations du Studio Cynydd</Subtitle>
      <H2>Nouveautés</H2>
      <section className="shop-news">
        <Carousel
          showStatus={false}
          showThumbs={false}
          showIndicators
          autoPlay
          interval={8000}
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
                <input
                  type="search"
                  placeholder="par mots-clés dans le nom"
                  className="searchbar"
                  value={searchValue}
                  onChange={(e) => handleSearchChange(e)}
                />
              </article>
              <article className="shop-navigation-section">
                <H3>Catégories</H3>
                <ul>
                  <li key={uuid()}>
                    <a
                      onClick={() => handleCategoryNavLinkClick('all-categories')}
                      className={(selectedCategorySlug === 'all-categories') ? 'shop-navigation-link active' : 'shop-navigation-link'}
                    >
                      Toutes les catégories
                    </a>
                  </li>
                  {
                    categories.map(category =>
                      <li key={uuid()}>
                        <a
                          onClick={() => handleCategoryNavLinkClick(category.slug)}
                          className={(selectedCategorySlug === category.slug) ? 'shop-navigation-link active' : 'shop-navigation-link'}                          
                        >
                        {category.title}
                        </a>
                      </li>)
                  }   
                </ul>
              </article>
              <article hidden className="shop-navigation-section">
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
        { (searchResults.length <= 0) && <Paragraph label="alert">Aucun résultat correspond aux mots-clés : {searchValue}.</Paragraph> }
        { (selectedCategoryProducts.length <= 0) && <Paragraph label="alert">Aucun produit dans la catégorie sélectionnée.</Paragraph> }
        { (selectedCategorySlug != 'all-categories') && <ShopCards cardsData={selectedCategoryProducts} /> }     
        { (searchResults.length > 0 && selectedCategorySlug === 'all-categories') && <ShopCards cardsData={searchResults} /> }

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
      herologo: await getAssetById(globalAssetsID.herologo),
      categories: await getCategories(),
      allProducts: await getProducts(),
      shopnewsdata: await getShopNews(),
    }
  }
}