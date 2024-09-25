/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],

  /**
   * GitHub Pages Configuration
   *
   * @see https://github.com/gregrickaby/nextjs-github-pages
   */
  output: "export",
  basePath: "/portfolio",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
