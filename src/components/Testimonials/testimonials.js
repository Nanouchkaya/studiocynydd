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