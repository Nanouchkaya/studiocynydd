import { H2, Subtitle } from "@librairy/atoms";
import { BlockService } from '@librairy/molecules';
import { v4 as uuidv4 } from 'uuid';

export const Services = ({ services }) => {
  return ( 
    <section className="services">
      <H2>Cynydd c'est...</H2>
      <Subtitle>De la papeterie colorée et tendance aux dessins traditionnels et digitales réalisés par nos soins depuis 2015 !</Subtitle>
      { services.map(service => (
        <BlockService
          key={uuidv4()}
          src={service.image.fields.file.url}
          alt={service.image.fields.file.description}
          href={service.link}
          linkText={service.linkText}>
          {service.content}
        </BlockService> 
      ))}
    </section>
  );
}
