import PropTypes from "prop-types";
export const SquareImg = ({ alt = '', src }) => {
  const imageSVGTrace = `${src}?trace`;
  
  return (
    <div className='picture-wrapper'>
      <img className="svg-trace" src={imageSVGTrace.trace} />
      <picture >
        <source srcSet={`${src}?fm=webp`} type="image/webp" />
        <source srcSet={`${src}?fm=jpeg`} type="image/jpeg" />
        <img className='img-square' src={imageSVGTrace.src} alt={alt} loading="lazy" />
      </picture>
    </div>
  )
}

SquareImg.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string
}
