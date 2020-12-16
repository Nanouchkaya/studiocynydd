import PropTypes from "prop-types";
import { Navbar } from "@components/Navbar";
import { HeroLogo, Logo, LandscapeImg, Message } from '@librairy/atoms';

export const Header = ({ type, herologo, slogan, advertisements }) => {
  return (
    <header>
      <Navbar />
      { advertisements.map(message => <Message>{message}</Message>) }
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
