import { Layout } from "@librairy/organisms/index";
import { H1, H3 } from "@librairy/atoms";

export default function Custom404() {
  return <Layout type="header-page">
    <H1>404</H1>
    <picture>
      <source srcSet={`./images/branche.png?fm=webp`} type="image/webp" />
      <source srcSet={`./images/branche.png?fm=jpeg`} type="image/jpeg" />
      <img src='./images/branche.png' alt='branche' style={{margin: 'auto', width: '200px'}} loading="lazy" />
    </picture>
    <H3><span style={{color: '#746663'}}>Oups ! Page introuvable :(</span></H3>
  </Layout>
}