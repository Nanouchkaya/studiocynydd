import PropTypes from "prop-types";
export const GoToLink = ({ href, children, rel }) => {
  return <a href={href} rel={rel ? "noreferrer nofollow" : null} className="goTo-link">{children}</a>
};
GoToLink.propTypes = {
  children: PropTypes.string,
  href: PropTypes.string,
  rel: PropTypes.bool
}
