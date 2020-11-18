import PropTypes from "prop-types";
import Link from 'next/link';

export const ListLink = ({ href, alias = null, rel = null, children }) => {
  return (
    <li className="list-item">
      <Link href={href} as={alias}><a className='list-link' rel={rel ? "noreferrer nofollow" : null}>{children}</a></Link>
    </li>
  )
}
ListLink.propTypes = {
  children: PropTypes.string,
  href: PropTypes.any,
  rel: PropTypes.bool
}
