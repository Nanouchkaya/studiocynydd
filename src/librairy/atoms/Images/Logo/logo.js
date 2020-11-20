import PropTypes from "prop-types";
export const Logo = ({ alt, src }) => {
  const imageSVGTrace = `${src}?trace`;
  return (
    <div>
      <img src={imageSVGTrace.trace} />
      <picture >
        <source srcSet={`${src}?fm=webp`} type="image/webp" />
        <source srcSet={`${src}?fm=jpeg`} type="image/jpeg" />
        <img className='logo' src={imageSVGTrace.src} alt={alt} loading="lazy" />
      </picture>
    </div>
  )
}
Logo.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string
}
