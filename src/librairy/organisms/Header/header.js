import PropTypes from "prop-types";
import { Navbar } from "@librairy/organisms/Navbar";
import { HeroLogo, Logo, LandscapeImg } from '@librairy/atoms';

export const Header = ({ type, herologo, slogan }) => {
  return (
    <header>
      <Navbar />
      { type === 'index-header' &&
        <div id="top">
          <HeroLogo src={herologo.url} alt="Studio Cynydd" />
          <LandscapeImg src={slogan.url} alt="Papeterie pleine de vie" />
        </div>
      }
      { type === 'page-header' && <Logo src={herologo.url} alt="Studio Cynydd" /> }
    </header>
  )
}
Header.propTypes = {
  type: PropTypes.string
}
