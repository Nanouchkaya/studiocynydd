import { Layout, News } from "@components/index";
import { ButtonSecondary, H1, H3, H4, ListLink, SquareImg, Subtitle, Thumbnail } from "@librairy/atoms";
import { ProductCategory } from "@librairy/molecules/Category";
import { getAssetById, getCategories } from "@utils/contentful";
import { v4 as uuid } from 'uuid';

const Shop = ({ herologo, categories }) => {
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
            {
              categories.map(category => <ListLink key={uuid()} href={category.url}>{category.title}</ListLink>)
            }   
            </ul>
          </article>
        </div>
      </aside>

      <article className="cards">
      { categories.map(category => (
        <div className="card" style={{}} key={uuid()}>
          <Thumbnail src={category.thumbnail} alt={category.title} />
          <ButtonSecondary href={category.url}>{category.title}</ButtonSecondary>
       </div>
       ))
      }
      </article>

    </section>
    </Layout>
  )
}

export default Shop;

export async function getStaticProps() {
  return {
    props : {
      herologo: await getAssetById('13trf7K2jrx5M7fWiW5pbo'),
      categories: await getCategories(),
    }
  }
}
