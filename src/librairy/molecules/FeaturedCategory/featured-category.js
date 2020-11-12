import { ButtonSecondary, SquareImg } from "@librairy/atoms"

export const FeaturedCategory = ({ url, image, name }) => {
  return (
    <div className="product-category card">
      <SquareImg src={image} alt={`Catégorie vedette ${name}`} />
      <ButtonSecondary href={url}>{name}</ButtonSecondary>
    </div>
  )
}