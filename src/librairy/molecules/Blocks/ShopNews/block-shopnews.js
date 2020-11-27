import PropTypes from "prop-types";
import { format } from 'date-fns'
import { fr } from 'date-fns/locale';
import { useMediaQuery } from "@utils/hooks/media-query";
import { ButtonPrimary } from "@librairy/atoms";

export const BlockShopNews = ({ title, imageScreen, imageMobile, description, link = null, date }) => {
  const image = useMediaQuery(600) ? imageMobile : imageScreen;

  return (
    <div
      className="shop-news-block"
      style={{backgroundImage: `url(${image})`}}  
    >
    <div className="shop-news-block-desc">
      <span className="shop-news-block-desc--title">{title}</span>
      <p>{description}</p>
      { link && <ButtonPrimary href={link}>Découvrir</ButtonPrimary> }
      <time>Le {format(new Date(date), 'dd/mm/yyyy' ,{ locale: fr } )}</time>
    </div>
    </div>
  )
}