import PropTypes from "prop-types";
export const Blockquote = ({ children }) => {
  return <blockquote>{children}</blockquote>;
}
Blockquote.propTypes = {
  children: PropTypes.any
}
