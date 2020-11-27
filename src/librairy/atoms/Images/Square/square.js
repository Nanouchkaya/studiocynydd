import PropTypes from "prop-types";
export const SquareImg = ({ alt = '', src }) => {
  
  return (
    <div className='picture-wrapper'>
      <picture >
        <source srcSet={`${src}?fm=webp`} type="image/webp" />
        <source srcSet={`${src}?fm=jpeg`} type="image/jpeg" />
        <img className='img-square' src={src} alt={alt} loading="lazy" />
      </picture>
    </div>
  )
}

SquareImg.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string
}
