import PropTypes from "prop-types";
import { Blockquote } from "@librairy/atoms/Texts/blockquote"
import { format } from 'date-fns'
import { fr } from 'date-fns/locale';

export const BlockTestimonial = ({ image, author, comment, date, isPro }) => {
  return (
    <figure className="block-testimonial">
      <picture>
        <source srcSet={`${image.url}?fm=webp`} type="image/webp" />
        <source srcSet={`${image.url}?fm=jpeg`} type="image/jpeg" />
        <img src={image.url } alt={author} loading="lazy" />
      </picture>
      <Blockquote>{ isPro && <div className="label-pro">Professionnel</div> }
      {comment}</Blockquote>
      <figcaption>
       {author}, le <time>{format(new Date(date), 'PPPP' ,{ locale: fr } )}</time>
      </figcaption>
    </figure>
  )
}

BlockTestimonial.propTypes = {
  author: PropTypes.string,
  comment: PropTypes.string,
  date: PropTypes.any,
  photo: PropTypes.string
}

// 2020-09-02