import { getClient } from "./client"
import { parseCategory, parseProduct, parseProductDetails, parseShopNews } from "./parsing"

export async function getCategories() {
  const allCategories = await getClient().getEntries({
    content_type: 'category',
    select: 'sys.id,fields',
    order: 'fields.order'
  })

  if (allCategories) return allCategories.items.map(category => parseCategory(category))
  
  console.log('Error getting all categories.')
}

export async function getProducts() { // only general informations for cards view
  const allProducts = await getClient().getEntries({
    content_type: 'product',
    select: 'sys.createdAt,fields.slug,fields.productName,fields.price,fields.images,fields.bestSeller,fields.categories,fields.discount,fields.variations',
  })

  if (allProducts) return allProducts.items.map(product => parseProduct(product))
  
  console.log('Error getting all products.')
}

// export async function getProductsByCategory(slug) {
//   const categoriesIdEqualToSlug = await getClient().getEntries({
//     content_type: 'category',
//     select: 'sys.id,fields.slug',
//     'fields.slug': slug,
//   }) //should match one result only (see contentful unique field)

//   if (categoriesIdEqualToSlug.items.length > 0) {
//     const productsCategory = await getClient().getEntries({
//       content_type: 'product',
//       'fields.categories.sys.id': categoriesIdEqualToSlug.items[0].sys.id, 
//     });

//     if (productsCategory.total > 0) return productsCategory.items.map(product => parseProduct(product))
//   }
//   console.log(`Error getting products for category ${slug}.`)
//   return {
//     error: true,
//     message: 'Aucun produit pour cette catégorie',
//   }
// }

export async function getProductDetails(slug) { // for product detailed page
  const productDetails = await getClient().getEntries({
    content_type: 'product',
    'fields.slug': slug,
  })
  
  if (productDetails.items.length > 0) {
    const selectedProductDetails = productDetails.items[0]
    return parseProductDetails(selectedProductDetails)
  }
  
  console.log(`Error getting details for product ${slug}.`)
}

export const getShopNews = async () => {
  const shopNews = await getClient().getEntries({
    content_type: 'shopNews',
    order: 'fields.date'
  })

  if (shopNews) return shopNews.items.map(news => parseShopNews(news))

  console.log('Error getting data for shop news content model')
}