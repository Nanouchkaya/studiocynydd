import { ButtonSecondary, SquareImg } from "@librairy/atoms"

export const FeaturedCategory = ({ handleChange = null, url, image, name, slug }) => {
  return (
    <div className="product-category card">
      <SquareImg src={image} alt={`Catégorie vedette ${name}`} />
      <ButtonSecondary href={url} handleChange={handleChange} slug={slug}>{name}</ButtonSecondary>
    </div>
  )
}