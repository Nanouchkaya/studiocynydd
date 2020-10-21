import { Layout } from "@components/index";
import { GoToLink, H1, Paragraph, Subtitle } from "@librairy/atoms";
import { getAssetById } from "@utils/contentful";

const Shop = ({herologo}) => {
  return (
    <Layout title="Boutique" type="page-header" herologo={herologo}>
    <H1>La Boutique</H1>
    <Subtitle>A venir</Subtitle>
    <section id="about">
      <Paragraph>
      Bientôt vous pourrez commander sur notre site ! <br />
      D'ici là, retrouvez tous nos produits sur Etsy.</Paragraph>
      <GoToLink href="https://www.etsy.com/fr/shop/Cynydd" rel>Aller sur notre boutique Etsy</GoToLink>
    </section>
    </Layout>
  )
}

export default Shop;

export async function getStaticProps() {
  return {
    props : {
      herologo: await getAssetById('13trf7K2jrx5M7fWiW5pbo'),
    }
  }
}