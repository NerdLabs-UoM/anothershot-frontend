/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          "res.cloudinary.com",
          "assets.vogue.com",
          "m.media-amazon.com",
          "upload.wikimedia.org",
        ],
      },
}

module.exports = nextConfig
