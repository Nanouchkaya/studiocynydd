import { createClient } from 'contentful';

/* Set API connexion */

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  removeUnresolved: true,
  //resolveLinks: false
});

const previewClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  host: 'preview.contentful.com',
  removeUnresolved: true
});

export const getClient = (preview) => (preview ? previewClient : client);

// see https://contentful.github.io/contentful.js/contentful/latest/ContentfulClientAPI.html 