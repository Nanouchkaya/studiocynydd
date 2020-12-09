import { NavLink, ListLink, IconMini } from '@librairy/atoms';
import { v4 as uuidv4 } from 'uuid';
import { socialNetworkLinks, contactMail } from '@utils/site-constants';
import { SocialNetworkIcons } from '@librairy/molecules';

export const Navbar = () => {
  const toggleMenu = () => {
    const burgerMenu = document.querySelector('.menu-burger');
    burgerMenu.classList.toggle('menu-opened');
  }
  return (
    <>
      <nav id="nav-screen">
        <div className="nav-left">
          <SocialNetworkIcons />
          <span className="nav-email"><a href="/contact">{contactMail}</a></span>
        </div>

        <div className='nav-right'>
        {
          navItems.filter(item => item.inScreenNav).map(item => (
            <NavLink href={item.href} text={item.text} key={uuidv4()} />
          ))
        }
        </div>
      </nav>

      <ul className="menu-burger">{
        navItems.filter(item => item.inBurgerMenu).map(item => (
          <ListLink href={item.href} key={uuidv4()}>{item.text}</ListLink>
        ))
      }</ul>

      <nav id="nav-mobile">
        {
          navItems.filter(item => !item.inBurgerMenu).map(item => (
            <NavLink href={item.href} text={item.text} key={uuidv4()} />
          ))
        }
        <button className='nav-link' onClick={toggleMenu}>Menu</button>  
      </nav>

    </>
  );
}

const navItems = [
  {
    href: '/',
    text: 'Accueil',
    inBurgerMenu: false,
    inScreenNav : true
  },
  {
    href: '/boutique',
    text: 'Boutique',
    inBurgerMenu: false,
    inScreenNav : true
  },
  {
    href: '/prestation',
    text: 'Nos Prestations',
    inBurgerMenu: true,
    inScreenNav : true
  },
  {
    href: '/nous-trouver',
    text: 'Nous trouver',
    inBurgerMenu: true,
    inScreenNav : true
  },
  {
    href: '/a-propos',
    text: 'A propos',
    inBurgerMenu: true,
    inScreenNav : true
  },
  {
    href: '/contact',
    text: 'Contact',
    inBurgerMenu: true,
    inScreenNav : true
  },
  {
    href: '/conditions-generales-de-ventes',
    text: 'CGV',
    inBurgerMenu: true,
    inScreenNav : false
  },
  {
    href: '/mentions-legales',
    text: 'Mentions légales',
    inBurgerMenu: true,
    inScreenNav : false
  }
];