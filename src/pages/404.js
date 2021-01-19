import { Layout } from "@librairy/organisms/index";
import { H1, LandscapeImg, Subtitle } from "@librairy/atoms";
import { getAssetById } from "@utils/contentful";
import { globalAssetsID } from "@utils/site-constants";

export default function Custom404({ layout, branche }) {
  return (
    <Layout type="header-page" {...layout}>
      <H1>404</H1>
      <Subtitle>Oups ! Page introuvable :(</Subtitle>
      <LandscapeImg src={branche.url} alt={branche.alt} width={branche.width} height={branche.height} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      layout: {
        herologo: await getAssetById(globalAssetsID.herologo),
        labelFooter: {
          livraison: await getAssetById(globalAssetsID.livraison),
          paiement: await getAssetById(globalAssetsID.paiement),
          creationFr: await getAssetById(globalAssetsID.creationFr),
        },
      },
      branche: await getAssetById('1OiPWXfmrG8FkbPtDxPmIJ'),
    }
  }
}