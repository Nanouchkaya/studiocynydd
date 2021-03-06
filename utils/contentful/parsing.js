import { productIsNew } from "@utils/helpers";

/* PARSING export const  */
export const parseEntries = (entries, cb) => {
  return entries?.items?.map(cb)
}

export const parsePrestation = ({ fields }) => {
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

export const parseCategory = ({ fields, sys }) => {
  return {
    id: sys.id,
    title: fields?.title || null,
    slug: fields?.slug,
    featuredItem: fields?.featuredItem || false,
    image: fields?.icon?.fields.file || {url: 'https://picsum.photos/680/540'},
    description: fields?.description || '',
    url: fields?.url || '',
  }
}

export const parseProduct = ({ fields, sys }) => {
  let thumbnail;
  if (fields?.images) {
    const firstImage = fields.images[0].fields.file.url;
    thumbnail = `${firstImage}?fit=thumb`
  };

  return {
    name: fields?.productName || '',
    slug: fields?.slug || '',
    price: fields?.price || null,
    thumbnail: thumbnail || 'https://picsum.photos/500/500',
    variations: fields?.variations || [{sys: {}, fields: {}}],
    isBestSeller: fields?.bestSeller || false,
    categories: fields?.categories || [],
    isDiscount: fields.discount ? true : false,
    isNew: productIsNew(sys.createdAt),
    isAvailable: fields?.stock || true,
  }
}

export const parseProductDetails = ({ fields = {} }) => {
  let thumbnail;
  if (fields?.images) {
    const firstImage = fields.images[0].fields.file.url;
    thumbnail = `${firstImage}?fit=thumb`
  };

  return {
    name: fields?.productName || 'Sans nom',
    slug: fields?.slug,
    categories: fields?.categories || [],
    price: fields?.price || null,
    discount: fields?.discount || null,
    variations: fields?.variations || [],
    shippingMethods: fields?.shipping || {sys: {}, fields: {}},
    weight: fields.weight || 100,
    images: fields?.images || [],
    thumbnail: thumbnail || 'https://picsum.photos/500/500',
    description: fields?.description || 'Aucune description',
    faq: fields?.faq || '',
    tags: fields?.relatedProductTag || [],
    themes: fields?.themes || [],   
    isBestSeller: fields?.bestSeller || false,
    isAvailable: fields?.stock || true,
  }
}

export const parseBlockContent = ({ fields = {} }) => {
  return {
    name: fields?.name,
    content: fields?.content ?? null,
    link: fields?.link ?? null,
    linkText: fields?.linkText ?? null,
    image: fields?.image ?? null,
  }
}

export const parseTestimonial = ({ fields = {} }) => {
  return {
    author: fields?.auteur,
    date: fields?.date,
    comment: fields?.avis,
    image: fields?.photo?.fields.file || './images/avatar-femme.png',
    isPro: fields?.proTestimonial || false,
  }
}

export const parseInstaFeed = ({ fields = {} }) => {
  return {
    number: fields?.number ?? null,
    link: fields?.link ?? null,
    photo: fields?.photo ?? null
  }
}

export const parseRetailer = ({ fields = {} }) => {
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

export const parseShopNews = ({ fields = {} }) => {
  return {
    title: fields?.title,
    description: fields?.description,
    date: fields?.date,
    imageScreen: fields?.imageScreen.fields.file,
    imageMobile: fields?.imageMobile.fields.file,
    link: fields?.link,
    textLink: fields?.textLink
  }
}

export const parseProductThemes = ({ fields = {} }) => {
  return {
    name: fields?.name || '',
    relatedProducts: fields?.products.map(product => parseProduct(product)) || []
  }
}