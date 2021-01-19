import { v4 as uuid } from 'uuid';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { options } from '@utils/rich-text-options';

export const ProductShipping = ({ shippingMethods }) => (
  <details className="product-shipping">
    <summary>Livraison & retour</summary>
    {shippingMethods.map(shipping => (
      <div key={uuid()} className="product-shipping-item">
      <h4 className="product-shipping-item-name">{shipping.fields.name}</h4>
        {documentToReactComponents(shipping.fields.description, options)}
      </div>
    ))}
  </details>
)