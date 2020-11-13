import { Layout, News, Shop } from "@components/index";
import { H1, Subtitle } from "@librairy/atoms";
import { getAssetById, getCategories, getProductsByCategory } from "@utils/contentful";

const ShopPage = ({ herologo, categories, products }) => {
  return (
    <Layout title="Boutique" type="page-header" herologo={herologo}>
      <H1>La Boutique</H1>
      <Subtitle>Découvrez toutes les créations du Studio Cynydd</Subtitle>
      <News />
      <Shop categories={categories} products={products} />
    </Layout>
  )
}

export default ShopPage;

// // This function gets called at build time
// export async function getStaticPaths() {
//   // Call an external API endpoint to get posts
//   const categories = await getCategories();

//   // Get the paths we want to pre-render based on posts
//   const paths = categories.map((category) => ({
//     params: { categoryTitle: category.title },
//   }))

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false }
// }

export async function getStaticProps() {
  return {
    props : {
      herologo: await getAssetById('13trf7K2jrx5M7fWiW5pbo'),
      categories: await getCategories(),
      products: await getProductsByCategory('768Ni6CBlyGiPUdPUPhhSx'),
    }
  }
}


// 768Ni6CBlyGiPUdPUPhhSx