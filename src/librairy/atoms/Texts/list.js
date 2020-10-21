import PropTypes from "prop-types";
export const List = ({ children }) => (
  <ul className="list-text">{children}</ul>
)
List.propTypes = {
  children: PropTypes.any
}
