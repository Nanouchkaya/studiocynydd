import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import { v4 as uuid } from 'uuid';
import { getAssetById, getCategories, getProducts } from "@utils/contentful";
import { useMediaQuery } from "@utils/hooks/media-query";
import { Layout } from "@librairy/organisms/index";
import { ShopCards } from "@librairy/molecules";
import { H1, H2, H3, Paragraph, Subtitle, SquareImg } from "@librairy/atoms";
import { BlockShopNews } from "@librairy/molecules/Blocks/ShopNews";
import { getShopNews } from "@utils/contentful/shop";
import { stringCleaner } from "@utils/helpers";
import { globalAssetsID } from '@utils/site-constants';
import { CardSummary } from "@librairy/molecules/CardSummary";
import { useRouter } from "next/router";

const ShopPage = ({ layout, categories, allProducts, shopnewsdata }) => {
  const router = useRouter()
  const isBreakpoint = useMediaQuery(768);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState(router.query.cat ?? 'all-categories');
  const [searchValue, setSearchValue] = useState('');

  const selectedCategoryProducts = allProducts.filter(product => {
    const productsInCategoryEqualToSlug = product.categories.filter(category => category.fields.slug == selectedCategorySlug);

    if (selectedCategorySlug === 'all-products'
      || productsInCategoryEqualToSlug.length > 0 )
        return true;
  });

  const searchResults = allProducts.filter(product => {
    const cleanedProductName = stringCleaner(product.name);
    const cleanedSearchValue = stringCleaner(searchValue);
    return cleanedProductName.includes(cleanedSearchValue)
  });

  const handleSearchChange = (e) => {
    setSelectedCategorySlug('all-products');
    setSearchValue(e.target.value);
  }

  const handleCategoryNavLinkClick = (slug) => {
    setSearchValue('');
    setSelectedCategorySlug(slug);
  }

  const handleKeypress = (slug) => {
    handleCategoryNavLinkClick(slug);
  }

  return (
    <Layout title="Boutique" type="page-header" {...layout}>
    <CardSummary />
      <H1>La Boutique</H1>
      <Subtitle>D??couvrez toutes les cr??ations du Studio Cynydd</Subtitle>
      <H2>Nouveaut??s</H2>
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
                  placeholder="par mots-cl??s dans le nom"
                  className="searchbar"
                  value={searchValue}
                  onChange={(e) => handleSearchChange(e)}
                />
              </article>
              <article className="shop-navigation-section">
                <H3>Cat??gories</H3>
                <ul role="menu">
                  <li key={uuid()}>
                    <a
                      tabIndex="0"
                      role="menuitem"
                      onKeyPress={() => handleKeypress('all-categories')}
                      onClick={() => handleCategoryNavLinkClick('all-categories')}
                      className={(selectedCategorySlug === 'all-categories') ? 'shop-navigation-link active' : 'shop-navigation-link'}
                    >
                      Voir les cat??gories
                    </a>
                  </li>
                  <li key={uuid()}>
                    <a
                      tabIndex="0"
                      role="menuitem"
                      onKeyPress={() => handleKeypress('all-products')}
                      onClick={() => handleCategoryNavLinkClick('all-products')}
                      className={(selectedCategorySlug === 'all-products') ? 'shop-navigation-link active' : 'shop-navigation-link'}
                    >
                      Tous les produits
                    </a>
                  </li>
                  {
                    categories.map(category =>
                      <li key={uuid()}>
                        <a
                          tabIndex="0"
                          role="menuitem"
                          onClick={() => handleCategoryNavLinkClick(category.slug)}
                          onKeyPress={() => handleKeypress(category.slug)}
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
        { selectedCategorySlug == 'all-categories' && 
          <section className="shop-cards cards-categories">
            { categories.map(category => 
              <div className="product-category card" key={uuid()}>
                <a onClick={() => handleCategoryNavLinkClick(category.slug)}>
                  <SquareImg src={category.image.url} alt={`Cat??gorie vedette ${category.name}`} />
                  <span className="button-secondary">{category.title}</span>
                </a>
              </div>
              ) 
            }
          </section>
         ||
         searchResults.length <= 0 && 
          <Paragraph label="alert">Aucun r??sultat correspond aux mots-cl??s : {searchValue}.</Paragraph>
         ||
         (selectedCategorySlug != 'all-categories' && selectedCategoryProducts.length <= 0) && 
          <Paragraph label="alert">Aucun produit dans la cat??gorie s??lectionn??e.</Paragraph>
         ||
         selectedCategorySlug != 'all-products' && 
          <ShopCards cardsData={selectedCategoryProducts} /> 
         ||     
         (searchResults.length > 0 && selectedCategorySlug === 'all-products') && 
          <ShopCards cardsData={searchResults} /> 
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
      layout: {
        sitePhoto: await getAssetById(globalAssetsID.sitePhoto),
        herologo: await getAssetById(globalAssetsID.herologo),
        labelFooter: {
          livraison: await getAssetById(globalAssetsID.livraison),
          paiement: await getAssetById(globalAssetsID.paiement),
          creationFr: await getAssetById(globalAssetsID.creationFr),
        },
      },
      categories: await getCategories(),
      allProducts: await getProducts(),
      shopnewsdata: await getShopNews(),
    }
  }
}