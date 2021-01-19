import { SquareImg } from "@librairy/atoms"
import Link from "next/link"

export const FeaturedCategory = ({ image, name, slug }) => {
  return (
    <div className="product-category card">
      <Link href={{
        pathname: '/boutique',
        query: { cat: slug },
      }}>
        <a>
          <SquareImg src={image} alt={`Catégorie vedette ${name}`} />
          <span className="button-secondary">{name}</span>
        </a>
      </Link>
    </div>
  )
}