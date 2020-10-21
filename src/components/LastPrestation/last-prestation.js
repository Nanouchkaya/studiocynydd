import { H2, H3, Subtitle, Paragraph, ButtonSecondary } from "@librairy/atoms";

export const LastPrestation = ({ company, typeOfProduct, descriptionIndex, imageIndex}) => ( 
    <section className="lastprestation">
      <H2>Prestations personnalisées</H2>
      <Subtitle>Nos compétences à votre service pour du 100% sur mesure</Subtitle>
      <div className="lastprestation-content">
      <img src={imageIndex.url} alt={imageIndex.description} />
        <div className="lastprestation-details">
          <div>
            <H3>Dernière prestation</H3>
            <span>{company} - {typeOfProduct}</span>
            <Paragraph>{descriptionIndex}</Paragraph>
          </div>
          <ButtonSecondary href="/prestation">En savoir plus</ButtonSecondary>
        </div>
      </div>
    </section>
);
