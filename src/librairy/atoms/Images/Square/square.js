import PropTypes from "prop-types";
export const SquareImg = ({ alt = '', src, ...props }) => {
  
  return (
    <div className='picture-wrapper'>
      <picture >
        <source srcSet={`${src}?fm=webp`} type="image/webp" />
        <source srcSet={`${src}?fm=jpeg`} type="image/jpeg" />
        <img className='img-square' src={src} alt={alt} loading="lazy" height={props.height} width={props.width} />
      </picture>
    </div>
  )
}

SquareImg.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string
}
