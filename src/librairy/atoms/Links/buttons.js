import Link from "next/link";
import PropTypes from "prop-types";

export const FormButton = ({ type = 'text', children }) => (
  <button className="button-primary" type={type}>{children}</button>
);

FormButton.propTypes = {
  children: PropTypes.string
}

export const ButtonPrimary = ({ href = '/', children, rel = null }) => (
  <Link href={href}><a className="button-primary" rel={rel ? "noreferrer nofollow" : null}>{children}</a></Link>
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

export const AddButton = ({ quantity, slug, name, price, thumbnail, weight, ...customDataItem }) => { 
  return (
    <button
      className="snipcart-add-item button-add"
      data-item-id={`item-id-${slug}`}
      data-item-name={name}
      data-item-price={price}
      data-item-url={`http://studiocynydd.fr/boutique/produits/${slug}`}
      data-item-image={thumbnail}
      data-item-quantity={quantity}
      data-item-weight={weight}
      {...customDataItem}
      >      
        Ajouter au panier <span><img src='/images/shopping.png' alt='icon-cart' />{quantity}</span>
    </button>
  )
};

export const AddButtonSmall = ({ slug, name, price, weight, thumbnail, ...customDataItem }) => {
  return (
    <button
      className="snipcart-add-item button-add-small"
      data-item-id={`item-id-${slug}`}
      data-item-name={name}
      data-item-price={price}
      data-item-url={`http://studiocynydd.fr/boutique/produits/${slug}`}
      data-item-image={thumbnail}
      data-item-weight={weight}
      {...customDataItem}     
      >
        Ajouter <img src='/images/shopping.png' alt='icon-cart' />
    </button>
  )
};

ButtonPrimary.propTypes = {
  children: PropTypes.string
}
