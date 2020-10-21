import { Layout, FeaturedItems, Team, LastPrestation, Newsletter, Testimonials, InstaFeed} from '@components/index';
import { H1, Subtitle, SVGTag } from '@librairy/atoms'
import { getAssetById, getBlockContentBySection, getFeaturedItems, getInstaFeed, getLastPrestation, getTestimonials } from '@utils/contentful';
                                    
const HomePage = (props) => {
  return(
    <React.Fragment>
      {/*<SVGTag />*/}
      <Layout herologo={props.herologo} slogan={props.slogan}>
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
}

export default HomePage;

export async function getStaticProps() {
  return {
    props: {
      herologo: await getAssetById('13trf7K2jrx5M7fWiW5pbo'),
      slogan: await getAssetById('11C7EGNuGzcvsJ0cC6no28'),
      lastPrestation: await getLastPrestation(),
      featuredItems: await getFeaturedItems(),
      team: await getBlockContentBySection('team'),
      testimonials: await getTestimonials(),
      instaFeed: await getInstaFeed()
    }
  }
}
