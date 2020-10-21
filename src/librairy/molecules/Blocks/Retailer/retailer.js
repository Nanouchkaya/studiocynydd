import { H4 } from "@librairy/atoms";

export const BlockRetailer = ({ fields }) => (
  <div className="block-retailer">
    <H4>{fields.company}</H4>
    <div className="block-retailer-infos">
      <address>
      {fields.address}
      </address>
      <span className='block-retailer-products'>{fields.typeOfProduct}</span>
      <a href={fields.url} rel="noreferrer" className="block-retailer-url">Voir le site</a>
    </div>
  </div>
)