const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const withTM = require('next-transpile-modules')(['gsap', 'gsap/ScrollTrigger', 'gsap/MotionPathPlugin', 'gsap/DrawSVGPlugin']);

module.exports = withPlugins([withTM], [
  [optimizedImages, {
    mozjpeg: {
      quality: 80,
    },
  }],
]);