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
  const categories = await getClient().getEntries({
    content_type: 'category',
    order: 'fields.order'
  })
  if (categories) return categories.items.map(item => parseCategory(item))
  
  console.log('Error getting all categories.')
}

export async function getProductsByCategory(categoryID) {
  const productsCategory = await getClient().getEntries({
    content_type: 'product',
    'fields.categories.sys.id': categoryID,
  });
  
  if (productsCategory) return productsCategory.items.map(item => parseProduct(item))

  console.log(`Error getting products for category ${categoryID}.`)
}

export async function getTestimonials() {
  const testimonials = await getClient().getEntries({
    content_type: 'testimonial'
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

function parseCategory({ fields }) {
  return {
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
  return {
    title: fields?.productName || '',
    slug: fields?.slug || '',
    categories: fields?.categories || [],
    price: fields?.price || null,
    thumbnail: `${fields?.images?.fields.file.url}?fit=thumb` || '',
    images: fields?.images || [],
    description: fields?.productDescription || '',
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