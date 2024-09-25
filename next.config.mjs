/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],

  /**
   * GitHub Pages Configuration
   *
   * @see https://github.com/gregrickaby/nextjs-github-pages
   */
  output: "export",
  images: {
    unoptimized: true,
  },
  swcMinify: true,
  reactStrictMode: true,
};

export default nextConfig;
