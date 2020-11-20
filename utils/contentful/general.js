import { getClient } from "./client";
import { parseBlockContent, parseCategory, parseEntries, parseInstaFeed, parsePrestation, parseRetailer, parseTestimonial } from "./parsing";

/**
 * 
 * @param {string} entryId  ID from contentful entry (or content) to fetch
 */ 
export const getPageContent = async (entryId) => {
  const entry = await getClient().getEntry(entryId);
  if (entry) return {
      title: entry.fields.title,
      description: entry.fields.description,
      body: entry.fields.content
    };
  console.error(`Error getting page content of id ${entry}.`)
};

export const getBlockContentBySection = async (indexSection) => {
  const entries = await getClient().getEntries({
    content_type: 'blockContent',
    'fields.indexSection[in]': indexSection
  })
  if(entries) return parseEntries(entries, parseBlockContent);
  console.error(`Error getting services data.`)
};

export const getLastPrestation = async () => {
  const entries = await getClient().getEntries({
    content_type: 'collaboration' // former name id
  })
  const lastPrestation = entries.items.filter(prestation => prestation.fields.displayIndex)
  if (lastPrestation) return parsePrestation(lastPrestation[0]);

  console.log(`Error getting last prestation.`)
};

export const getFeaturedItems = async () => {
  const entries = await getClient().getEntries({
    content_type: 'category',
    order: 'fields.order'
  })
  const featuredItems = entries.items.filter(category => category.fields.featuredItem)
  if (featuredItems) return featuredItems.map(item => parseCategory(item));

  console.log(`Error getting featured items.`)
};

export const getTestimonials = async () => {
  const testimonials = await getClient().getEntries({
    content_type: 'testimonial',
    order: '-fields.date',
  })

  if(testimonials) return parseEntries(testimonials, parseTestimonial);
};

export const getInstaFeed = async () => {
  const instaFeed = await getClient().getEntries({
    content_type: 'instaFeed',
    order: '-fields.number'
  })

  if(instaFeed) return parseEntries(instaFeed, parseInstaFeed);
};

export const getRetailers = async () => {
  const retailers = await getClient().getEntries({
    content_type: 'retailer'
  })
  
  if(retailers) return parseEntries(retailers, parseRetailer);
};

export const getAssetById = async (id) => {
  const asset = await getClient().getAsset(id);
  return {
    url: asset.fields?.file.url,
    alt: asset.fields?.title,
    type: asset.fields?.file.contentType,
    width: asset.fields?.file.details.image.width,
    height: asset.fields?.file.details.image.height,
  };
};

export const getAssetThumbnail = async (asset) => {
  return `${asset.fields.file.url}?fit=thumb`;
}