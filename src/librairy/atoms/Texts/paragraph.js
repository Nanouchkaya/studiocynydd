import PropTypes from "prop-types";

export const Paragraph = ({
  children,
  label = '',
}) => {
  const finalClassName = label ? `paragraph ${label}` : null;
  return <p className={finalClassName}>{children}</p>;
}
Paragraph.propTypes = {
  children: PropTypes.any,
  label: PropTypes.string
}
