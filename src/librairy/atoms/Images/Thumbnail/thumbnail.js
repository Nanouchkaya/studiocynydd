import PropTypes from "prop-types";

export const Thumbnail = ({ alt = '', src }) => { 
  return (
    <div className='picture-wrapper thumbnail'>
      <picture >
        <img className='img-thumbnail' src={src} alt={alt} loading="lazy" />
      </picture>
    </div>
  )
}

Thumbnail.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string
}


//       <picture >
//         <source srcSet={`${src}&fm=webp`} type="image/webp" />
//         <source srcSet={`${src}&fm=jpeg`} type="image/jpeg" />
//         <img className='img-thumbnail' src={src} alt={alt} loading="lazy" />
//       </picture>