import PropTypes from "prop-types";
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

export const NavLink = ({ children, text, ...props }) => {
  const { asPath } = useRouter()

  // pages/index.js will be matched via props.href
  // pages/about.js will be matched via props.href
  // pages/[slug].js will be matched via props.as

  const className = 
    asPath === props.href || asPath === props.as
      ? 'nav-link nav-link--active'
      : 'nav-link';

  return (
    <Link {...props}>
      <a className={className}>{text}</a>
    </Link>
  )
}
NavLink.propTypes = {
  children: PropTypes.string,
  text: PropTypes.string
}
