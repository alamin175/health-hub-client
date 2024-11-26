const path = require("path");

module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@redux": path.resolve(__dirname, "src/redux"),
      "@utils": path.resolve(__dirname, "src/utils"),
    };
    return config;
  },
  images: {
    domains: ["res.cloudinary.com"], // Add Cloudinary domain here
  },
};
