import PropTypes from "prop-types";
export const Logo = ({ alt, src }) => {
  return (
    <div>
      <picture >
        <source srcSet={`${src}?fm=webp`} type="image/webp" />
        <source srcSet={`${src}?fm=jpeg`} type="image/jpeg" />
        <img className='logo' src={src} alt={alt} loading="lazy" />
      </picture>
    </div>
  )
}
Logo.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string
}
