import PropTypes from "prop-types";
import { v4 } from 'uuid';

export const Paragraph = ({
  uuid = v4(),
  children,
  label = '',
}) => {
  const finalClassName = label ? `paragraph ${label}` : null;
  return <p key={uuid} className={finalClassName}>{children}</p>;
}
Paragraph.propTypes = {
  children: PropTypes.any,
  label: PropTypes.string
}
