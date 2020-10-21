import PropTypes from "prop-types";
import { LandscapeImg, ButtonSecondary, Paragraph } from "@librairy/atoms";

export const BlockService = ({ src, alt, href, linkText, children }) => {
  return ( 
  <div className="block-service">
    <LandscapeImg src={src} alt={alt} />
    <div className="block-service-details">
      <Paragraph>{children}</Paragraph>
      <ButtonSecondary href={href} rel>{linkText}</ButtonSecondary>
    </div>
  </div>
 );
}
BlockService.propTypes = {
  alt: PropTypes.string,
  children: PropTypes.string,
  src: PropTypes.string
}
