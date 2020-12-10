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

export const AddButton = ({ quantity, ...props }) => {
  return (
    <button
      className="snipcart-add-item button-add"
      data-item-id={`item-id-${props.slug}`}
      data-item-name={props.name}
      data-item-price={props.price}
      data-item-url={`http://studiocynydd.fr/boutique/produits/${props.slug}`}
      data-item-image={props.thumbnail}
      data-item-categories="cat1, cat2, cat3"
      data-item-custom1-required="true"
      
      >
          Ajouter au panier ({quantity})
    </button>
  )
};

ButtonPrimary.propTypes = {
  children: PropTypes.string
}
