import { getAssetById, getCategories, getProductsByCategory } from "@utils/contentful";
import { H1, Message, Paragraph, Subtitle } from '@librairy/atoms';
import { News, Layout, ShopNav } from '@components/index';
import { ShopCards } from '@librairy/molecules';

const ShopCategoryPage = ({ herologo, categories, products }) => {
  //console.log({products})
  return (
    <Layout title="Boutique" type="page-header" herologo={herologo}>
      <H1>La Boutique</H1>
      <Subtitle>Découvrez toutes les créations du Studio Cynydd</Subtitle>
      <News />
      <section className="shop">
        <ShopNav categories={categories} />
        {
          products.error
          ? <Paragraph label="alert">{products.message}</Paragraph>
          : <ShopCards cardsData={products} />
        }
      </section>
    </Layout>
  )
}

export default ShopCategoryPage;

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get categories
  const categories = await getCategories();

  // Get the paths we want to pre-render based on categories
  const paths = categories.map((category) => (
    { params: { slug: category.slug },
      
    }
  ))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  console.log({params})
  return {
    props : {
      herologo: await getAssetById('13trf7K2jrx5M7fWiW5pbo'),
      categories: await getCategories(),
      products: await getProductsByCategory(params.slug),
    }
  }
}