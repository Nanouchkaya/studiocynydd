export const ProductVariations = ({ variations }) => {
  return (
    <details className="product-variations">
        <summary>Options disponibles</summary>
        <Paragraph label="alert">Les options sont à définir dans votre panier au moment de l'ajout de l'article.</Paragraph>
      {
        variations.map(variation => {
          const hasOptions = variation.fields?.options?.length > 0;
          return (
            <div key={uuid()} className="product-variations-item">
              <span className="product-variations-item-name">{variation.fields.name}</span>
              { hasOptions && (
                <ul className="options-list">
                    {variation.fields.options.map(option => (
                      <li key={uuid()} className="options-list-item">{option}</li>
                    ))}
                </ul>
                )
              }
              { !hasOptions && <Paragraph>Aucune option disponible pour cet article.</Paragraph> }         
            </div>
          )
        })
      }
    </details>
  )
}