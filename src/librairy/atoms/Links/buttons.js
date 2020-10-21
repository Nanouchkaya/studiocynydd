import Link from "next/link";
import PropTypes from "prop-types";
export const ButtonPrimary = ({ type = 'text', children }) => (
  <button className="button-primary" type={type}>{children}</button>
);

ButtonPrimary.propTypes = {
  children: PropTypes.string
}


export const ButtonSecondary = ({ children, href = '/', rel = null }) => (
  <Link href={href}><a className="button-secondary" rel={rel ? "noreferrer nofollow" : null}>{children}</a></Link>
);
ButtonSecondary.propTypes = {
  children: PropTypes.string
}
