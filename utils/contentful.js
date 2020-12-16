import { createClient } from 'contentful';

/* Set API connexion */

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  removeUnresolved: true
})

const previewClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  host: 'preview.contentful.com',
  removeUnresolved: true
})

const getClient = (preview) => (preview ? previewClient : client);


// see https://contentful.github.io/contentful.js/contentful/latest/ContentfulClientAPI.html 

/**
 * 
 * @param {string} entryId  ID from contentful entry (or content) to fetch
 */

 export async function getAllSimplePages() {
  const entriesOfTypePage = await getClient().getEntries({
    content_type: 'page'
  })
  if(entriesOfTypePage) return entriesOfTypePage.items.map(page => (parsePage(page.sys, page.fields)))
  console.log(`Error getting entries of content type page.`)
 }
 
export async function getPageContent(entryId) {
  const entry = await getClient().getEntry(entryId);
  if (entry) return {
      title: entry.fields.title,
      description: entry.fields.description,
      body: entry.fields.content
    }
  console.error(`Error getting page content of id ${entry}.`)
}

export async function getAdvertisements() {
  const now = new Date()
  const entries = await getClient().getEntries({
    content_type: 'advertisement',
    'fields.startDate[lte]': now,
    'fields.endDate[gte]': now,
    'select': 'fields.message'
  })

  const advertisements = entries.items.map(entry => entry.fields.message)
  if (advertisements) return advertisements

  console.log(`Error getting advertisements.`)
}

export async function getBlockContentBySection(indexSection) {
  const entries = await getClient().getEntries({
    content_type: 'blockContent',
    'fields.indexSection[in]': indexSection
  })
  if(entries) return parseEntries(entries, parseBlockContent)
  console.error(`Error getting services data.`)
}

export async function getLastPrestation() {
  const entries = await getClient().getEntries({
    content_type: 'collaboration' // former name id
  })
  const lastPrestation = entries.items.filter(prestation => prestation.fields.displayIndex)
  if (lastPrestation) return parsePrestation(lastPrestation[0])

  console.log(`Error getting last prestation.`)
}

export async function getFeaturedItems() {
  const entries = await getClient().getEntries({
    content_type: 'category',
    order: 'fields.order'
  })
  const featuredItems = entries.items.filter(category => category.fields.featuredItem)
  if (featuredItems) return featuredItems.map(item => parseCategory(item))

  console.log(`Error getting featured items.`)
}

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
    select: 'fields.slug,fields.productName,fields.price,fields.images,fields.bestSeller',
  })

  if (allProducts) return allProducts.items.map(product => parseProduct(product))
  
  console.log('Error getting all products.')
}

export async function getProductsByCategory(slug) {
  const categoriesIdEqualToSlug = await getClient().getEntries({
    content_type: 'category',
    select: 'sys.id,fields.slug',
    'fields.slug': slug,
  }) //should match one result only (see contentful unique field)

  if (categoriesIdEqualToSlug.items.length > 0) {
    const productsCategory = await getClient().getEntries({
      content_type: 'product',
      'fields.categories.sys.id': categoriesIdEqualToSlug.items[0].sys.id, 
    });

    if (productsCategory.total > 0) return productsCategory.items.map(product => parseProduct(product))
  }
  console.log(`Error getting products for category ${slug}.`)
  return {
    error: true,
    message: 'Aucun produit pour cette catégorie',
  }
}

export async function getProductDetails(slug) { // for product detailed page
  const productDetails = await getClient().getEntries({
    content_type: 'product',
    'fields.slug': slug,
  })
  
  if (productDetails.items.length > 0) {
    const selectedProductDetails = productDetails.items[0]
    console.log({selectedProductDetails})
    return parseProductDetails(selectedProductDetails)
  }
  
  console.log(`Error getting details for product ${slug}.`)
}

export async function getTestimonials() {
  const testimonials = await getClient().getEntries({
    content_type: 'testimonial',
    order: '-fields.date',
  })

  if(testimonials) return parseEntries(testimonials, parseTestimonial)
}

export async function getInstaFeed() {
  const instaFeed = await getClient().getEntries({
    content_type: 'instaFeed',
    order: '-fields.number'
  })

  if(instaFeed) return parseEntries(instaFeed, parseInstaFeed)
}

export async function getRetailers() {
  const retailers = await getClient().getEntries({
    content_type: 'retailer'
  })
  
  if(retailers) return parseEntries(retailers, parseRetailer)
}

export async function getAssetById(id) {
  const asset = await getClient().getAsset(id);
  return {
    url: asset.fields?.file.url,
    alt: asset.fields?.title,
    type: asset.fields?.file.contentType,
    width: asset.fields?.file.details.image.width,
    height: asset.fields?.file.details.image.height,
  };
}

export async function getAssetThumbnail(asset) {
  return `${asset.fields.file.url}?fit=thumb`;
}

/* PARSING FUNCTIONS */
function parseEntries(entries, cb) {
  return entries?.items?.map(cb)
}

function parsePrestation({ fields }) {
  return {
    company: fields?.company,
    url: fields?.url,
    description: fields?.description,
    image: fields?.image?.fields.file || '',
    typeOfProduct: fields?.typeOfProduct,
    displayIndex: fields?.displayIndex || false,
    // If displayIndex is true, use this image and description for last prestation section.
    imageIndex: fields?.imageIndex?.fields.file || null,
    descriptionIndex: fields?.descriptionIndex || null
  };
}

function parseCategory({ fields, sys }) {
  return {
    id: sys.id,
    title: fields?.title || null,
    slug: fields?.slug,
    featuredItem: fields?.featuredItem || false,
    image: fields?.icon?.fields.file || '',
    thumbnail: `${fields?.icon?.fields.file.url}?fit=thumb` || '',
    description: fields?.description || '',
    url: fields?.url || '',
  }
}

function parseProduct({ fields }) {
  let thumbnail
  if (fields?.images) {
    const firstImage = fields.images[0].fields.file.url;
    thumbnail = `${firstImage}?fit=thumb`
  }
  return {
    title: fields?.productName || '',
    slug: fields?.slug || '',
    price: fields?.price || null,
    thumbnail: thumbnail || '',
    isBestSeller: fields?.bestSeller || false,
  }
}

function parseProductDetails({ fields }) {
  console.log({fields})
  return {
    name: fields?.productName || 'Sans nom',
    categories: fields?.categories || [],
    price: fields?.price || null,
    variation: fields?.variation || {sys: {}, fields: {}},
    deliveryFee: fields?.deliveryFee || {sys: {}, fields: {}},
    images: fields?.images || [],
    description: fields?.productDescription || 'Aucune description',
    tags: fields?.relatedProductTag || [],
    isCustomizable: fields?.personnalisation || false,
    isBestSeller: fields?.bestSeller || false,
  }
}

function parseBlockContent({ fields }) {
  return {
    name: fields?.name,
    content: fields?.content ?? null,
    link: fields?.link ?? null,
    linkText: fields?.linkText ?? null,
    image: fields?.image ?? null,
  }
}

function parseTestimonial({fields = {}}) {
  return {
    author: fields?.auteur,
    date: fields?.date,
    comment: fields?.avis,
    image: fields?.photo?.fields.file || './images/avatar-femme.png',
    isPro: fields?.proTestimonial || false,
  }
}

function parseInstaFeed({fields = {}}) {
  return {
    number: fields?.number ?? null,
    link: fields?.link ?? null,
    photo: fields?.photo ?? null
  }
}

function parseRetailer({fields = {}}) {
  return {
    company: fields?.company,
    siteURL: fields?.site || '',
    address: fields?.address,
    typeOfProduct: fields?.typeOfProduct || 'divers',
    gps: {
      latitude: fields?.gps.lat,
      longitude: fields.gps.lon
    }
  }
}

// function parsePage({ sys, fields }) {
//   return {
//     id: sys.id,
//     title: fields.title,
//     slug: fields.slug,
//     content: fields.content,
//     description: fields.description,
//   }
// }