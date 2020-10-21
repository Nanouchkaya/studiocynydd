import { Paragraph, H2, SquareImg, Subtitle, ButtonPrimary, ButtonSecondary } from "@librairy/atoms";
import { v4 as uuid } from 'uuid';

export const Team = ({ team }) => {
  
  return ( 
    <section className="team">
      <H2>Qui sommes-nous ?</H2>
      <Subtitle>Vos créatrices auvergnates</Subtitle>
      <div className="team-content">
        {
          team.map(teamMember => (
            <div key={uuid()}>
              <SquareImg src={teamMember.image.fields.file.url} alt={teamMember.image.fields.file.description} />
              <Paragraph>{teamMember.content}</Paragraph>
            </div>
          ))
        }
      </div>
      <ButtonSecondary href="/contact">Des questions ? Contactez-nous !</ButtonSecondary>
    </section>
  );
};