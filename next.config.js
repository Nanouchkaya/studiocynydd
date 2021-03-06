const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const withTM = require('next-transpile-modules')(['gsap', 'gsap/ScrollTrigger', 'gsap/MotionPathPlugin', 'gsap/DrawSVGPlugin']);

module.exports = withPlugins([withTM], [
  [optimizedImages, {
    mozjpeg: {
      quality: 80,
    },
  }]
]);

module.exports = {
  images: {
    domains: ['images.ctfassets.net']
  }
};

const sitemap = require('nextjs-sitemap-generator');  
sitemap({  
  baseUrl: 'studiocynydd.fr',  
  pagesDirectory: "src/pages",  
  targetDirectory : 'public/',
  ignoredPaths: ["[fallback]"],
});