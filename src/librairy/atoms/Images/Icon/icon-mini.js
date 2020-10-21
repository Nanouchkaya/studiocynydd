import PropTypes from "prop-types";
export const IconMini = ({ href, src, alt = 'icon' }) => (
  <a className="icon-mini" href={href}>
    <img src={src} alt={alt} loading="lazy" />
  </a>
);
IconMini.propTypes = {
  alt: PropTypes.string,
  href: PropTypes.string,
  src: PropTypes.string
} 
