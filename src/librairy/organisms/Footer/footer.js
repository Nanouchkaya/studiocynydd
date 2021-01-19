import { H3, LandscapeImg, ListLink } from '@librairy/atoms';
import { v4 as uuidv4 } from 'uuid';
import { socialNetworkLinks } from '@utils/site-constants';

export const Footer = ({ labelFooter }) => {
  return ( 
    <footer id="footer">
    <div className="footer-labels">
      <img
        src={labelFooter.livraison.url}
        alt={labelFooter.livraison.alt}
        width={labelFooter.livraison.width}
        height={labelFooter.livraison.height}
        loading="lazy"
      />
      <img
        src={labelFooter.paiement.url}
        alt={labelFooter.paiement.alt}
        width={labelFooter.paiement.width}
        height={labelFooter.paiement.height}
        loading="lazy"
      />
      <img
        src={labelFooter.creationFr.url}
        alt={labelFooter.creationFr.alt}
        width={labelFooter.creationFr.width}
        height={labelFooter.creationFr.height}
        loading="lazy"
      />
    </div>
    <div className="footer-links">
      { footerSections.map(section => (
        <section key={uuidv4()}>
          <H3>{section.name}</H3>
          <ul>
          {
            section.links.map(link => <ListLink key={uuidv4()} href={link.href} rel={link.rel}>{link.text}</ListLink>)
          }               
          </ul>
        </section>
      ))}
    </div>
    </footer>
  );
}


const footerSections = [
  {
    name: 'La Boutique',
    links: [
      {
        href: 'https://www.etsy.com/fr/shop/Cynydd?section_id=27384992',
        rel: true,
        text: 'Affiches à personnaliser',
      },
      {
        href: 'https://www.etsy.com/fr/shop/Cynydd?section_id=23846856',
        rel: true,
        text: 'Cartes à planter',
      },
      {
        href: 'https://www.etsy.com/fr/shop/Cynydd?section_id=29088950',
        rel: true,
        text: 'Papeterie'
      },
      {
        href: 'https://www.etsy.com/fr/shop/Cynydd?section_id=26163384',
        rel: true,
        text: 'Accessoire',
      },
    ]
  },
  {
    name: 'Liens utiles',
    links: [
      {
        href: '/conditions-generales-de-ventes#la-livraison',
        text: 'Livraison et retour',
      },
      {
        href: '/conditions-generales-de-ventes',
        text: 'Conditions générales de vente',
      },
      {
        href: '/mentions-legales',
        text: 'Mentions Légales',
      },
      {
        href: 'https://www.etsy.com/fr/shop/Cynydd',
        rel: true,
        text: 'Boutique Etsy',
      },
    ]
  },
  {
    name: 'Réseaux sociaux',
    links: [
      {
        href: `${socialNetworkLinks.instagram}`,
        rel: true,
        text: 'Instagram',
      },
      {
        href: `${socialNetworkLinks.facebook}`,
        rel: true,
        text: 'Facebook',
      },
      {
        href: `${socialNetworkLinks.pinterest}`,
        rel: true,
        text: 'Pinterest',
      },
    ]
  }
];