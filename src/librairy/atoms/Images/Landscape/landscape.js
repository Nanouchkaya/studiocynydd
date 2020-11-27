import PropTypes from "prop-types";
export const LandscapeImg = ({ alt = '', src, position = '', customClass = '' }) => {
  const margin = position === 'center' ? 'auto' : '';
  const float = position === 'center' ? '' : position;
  
  return (
    <div className='picture-wrapper'>
      <picture>
        <source srcSet={`${src}?fm=webp`} type="image/webp" />
        <source srcSet={`${src}?fm=jpeg`} type="image/jpeg" />
        <img className={`img-landscape ${customClass}`} src={src} alt={alt} style={{margin: margin, float: float}} loading="lazy" />
      </picture>
    </div>
  )
}

LandscapeImg.propTypes = {
  alt: PropTypes.string,
  position: PropTypes.string,
  src: PropTypes.string
}