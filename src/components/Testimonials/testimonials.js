import { H2, Subtitle } from '@librairy/atoms';
import { BlockTestimonial } from '@librairy/molecules/Blocks';
import { Carousel } from 'react-responsive-carousel';
import { v4 as uuidv4 } from 'uuid';

export const Testimonials = ({ testimonials }) => (
  <section className="testimonials">
    <H2>Témoignages</H2>
    <Subtitle>Ils nous ont fait confiance</Subtitle>
    <div className="testimonials-content">
      <Carousel
        showStatus={false}
        showThumbs={false}
        showIndicators
        autoPlay
        interval={20000}
        infiniteLoop
      >
      {
        testimonials.map(testimonial => (
          <BlockTestimonial
            key={uuidv4()}
            author={testimonial.author}
            date={testimonial.date} 
            comment={testimonial.comment}
            image={testimonial.image}
            isPro={testimonial.isPro}
          />
        ))
      }
      </Carousel>
    </div>
  </section>
)

// const testimonialsData = [
//   {
//     author: "Coralie",
//     comment: "La qualité est ouf, l'emballage est super soigné, merci pour votre rapidité !",
//     date: "4 septembre 2020",
//     image: null
//   },
//   {
//     author: "Anne S",
//     comment: "J'ai commandé une petite affiche avec la date de naissance de mon fils et deux jolies cartes anniversaires. Très contente du résultat et un très bel emballage avec un joli petit cadeau. Des créatrices très à l'écoute. Je recommande +++ :)",
//     date: "2 septembre 2020",
//     image: null
//   },
//   {
//     author: "Cécile",
//     comment: "Boutique au top, j'ai commandé plusieurs fois. Les cartes à ensemencer font sensations. Coup de cœur pour l'affiche La vie est belle!",
//     date: "1 septembre 2020",
//     image: null
//   },
//   {
//     author: "Océane",
//     comment: "J'ai commandé en juin des cartes à planter à offrir aux professeurs de ma fille, ils ont adorés ! Et nous aussi ♥ je recomande chez vous pour cette année ♥",
//     date: "1 septembre 2020",
//     image: null
//   },
//   {
//     author: "Anne S",
//     comment: "J'ai commandé une petite affiche avec la date de naissance de mon fils et deux jolies cartes anniversaires. Très contente du résultat et un très bel emballage avec un joli petit cadeau. Des créatrices très à l'écoute. Je recommande +++ :)",
//     date: "2 septembre 2020",
//     image: null
//   },
//   {
//     author: "Cécile",
//     comment: "Boutique au top, j'ai commandé plusieurs fois. Les cartes à ensemencer font sensations. Coup de cœur pour l'affiche La vie est belle!",
//     date: "1 septembre 2020",
//     image: null
//   }
  
// ]