import PropTypes from "prop-types";
import Link from 'next/link';

export const ListLink = ({ href, rel = null, children }) => {
  return (
    <li className="list-item">
      <Link href={href}><a className='list-link' rel={rel ? "noreferrer nofollow" : null}>{children}</a></Link>
    </li>
  )
}
ListLink.propTypes = {
  children: PropTypes.string,
  href: PropTypes.string,
  rel: PropTypes.bool
}
