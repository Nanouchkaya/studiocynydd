import PropTypes from "prop-types";
import { format } from 'date-fns'
import { fr } from 'date-fns/locale';
import { useMediaQuery } from "@utils/hooks/media-query";
import { ButtonPrimary, LandscapeImg } from "@librairy/atoms";

export const BlockShopNews = ({ title, imageScreen, imageMobile, description, link = null, textLink = 'Découvrir', date }) => {
  const image = useMediaQuery(600) ? imageMobile : imageScreen;

  return (
    <div className="shop-news-block">
    <LandscapeImg
        src={`https:${image.url}`}
        alt={title}
        width={image.details.image.width}
        height={image.details.image.height}
      /> 
    <div className="shop-news-block-desc">
      <span className="shop-news-block-desc--title">{title}</span>
      <p>{description}</p>
      { link && <ButtonPrimary href={link}>{textLink}</ButtonPrimary> }
      <time>Le {format(new Date(date), 'dd/mm/yyyy' ,{ locale: fr } )}</time>
    </div>
    </div>
  )
}

BlockShopNews.propTypes = {
  date: PropTypes.any,
  description: PropTypes.string,
  imageMobile: PropTypes.object,
  imageScreen: PropTypes.object,
  link: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string
}
