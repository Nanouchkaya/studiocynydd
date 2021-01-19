import { Layout, FeaturedItems, Team, LastPrestation, Newsletter, Testimonials, InstaFeed} from '@librairy/organisms/index';
import { H1, Subtitle, SVGTag } from '@librairy/atoms'
import { getAssetById, getBlockContentBySection, getFeaturedItems, getInstaFeed, getLastPrestation, getTestimonials } from '@utils/contentful';
import { globalAssetsID } from '@utils/site-constants';
                                    
const HomePage = (props) => {
  return(
    <React.Fragment>
      {/*<SVGTag />*/}
      <Layout {...props.layout}>
        <H1>Bienvenue !</H1>
        <Subtitle>Studio Cynydd, c'est une boutique en ligne proposant une gamme complète de papeterie et des créations personnalisées pour particuliers et professionnels.</Subtitle>
        <FeaturedItems categories={props.featuredItems} />
        <LastPrestation {...props.lastPrestation} />
        <Team team={props.team} />
        <Testimonials testimonials={props.testimonials}/>
        <Newsletter />
        <InstaFeed feed={props.instaFeed} />
      </Layout>
    </React.Fragment>
  )
};

export default HomePage

export async function getStaticProps() {
  return {
    props: {
      layout: {
        herologo: await getAssetById(globalAssetsID.herologo),
        slogan: await getAssetById(globalAssetsID.slogan),
        labelFooter: {
          livraison: await getAssetById(globalAssetsID.livraison),
          paiement: await getAssetById(globalAssetsID.paiement),
          creationFr: await getAssetById(globalAssetsID.creationFr),
        },
      },
      lastPrestation: await getLastPrestation(),
      featuredItems: await getFeaturedItems(),
      team: await getBlockContentBySection('team'),
      testimonials: await getTestimonials(),
      instaFeed: await getInstaFeed(),
    }
  }
}
