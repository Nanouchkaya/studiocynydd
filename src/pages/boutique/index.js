import { Layout, News, ShopNav } from "@components/index";
import { H1, Subtitle } from "@librairy/atoms";
import { ShopCards } from "@librairy/molecules";
import { getAssetById, getCategories } from "@utils/contentful";

const ShopPage = ({ herologo, categories }) => {
  return (
    <Layout title="Boutique" type="page-header" herologo={herologo}>
      <H1>La Boutique</H1>
      <Subtitle>Découvrez toutes les créations du Studio Cynydd</Subtitle>
      <News />
      <section className="shop">
        <ShopNav categories={categories} />
        <ShopCards cardsData={categories} />
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
    }
  }
}