/** @type {import('next').NextConfig} */
const NextPWA = require('next-pwa');

const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "assets.vogue.com",
      "m.media-amazon.com",
      "upload.wikimedia.org",
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'handlebars': 'handlebars/dist/handlebars.js'
    };
    return config;
  },
  reactStrictMode: true,
  swcMinify: true,     
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
}

const withPWA = NextPWA({
  // Your PWA configuration options here
});

// Export the combined configuration for Next.js with PWA support
module.exports = withPWA(nextConfig);