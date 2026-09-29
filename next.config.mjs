/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep every WordPress URL exactly as it was (all end in a slash).
  trailingSlash: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: '/gerd-surgery-los-angeles', destination: '/expert-hiatal-hernia-surgery-in-los-angeles/', permanent: true },
      { source: '/lipoma-removal-los-angeles', destination: '/', permanent: true },
      { source: '/colonoscopy-and-endoscopy-los-angeles', destination: '/', permanent: true },
      { source: '/vascular-access-in-los-angeles', destination: '/', permanent: true },
      { source: '/hello-world', destination: '/blog/', permanent: true },
      { source: '/category/:path*', destination: '/blog/', permanent: true },
      { source: '/feed', destination: '/blog/', permanent: true },
      { source: '/sitemap_index.xml', destination: '/sitemap.xml', permanent: true },
      { source: '/page-sitemap.xml', destination: '/sitemap.xml', permanent: true },
      { source: '/post-sitemap.xml', destination: '/sitemap.xml', permanent: true },
      { source: '/video-sitemap.xml', destination: '/sitemap.xml', permanent: true },
      { source: '/category-sitemap.xml', destination: '/sitemap.xml', permanent: true },
      { source: '/wp-admin/:path*', destination: '/admin/', permanent: false },
    ];
  },
  async rewrites() {
    return [{ source: '/admin/', destination: '/admin/index.html' }];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};
export default nextConfig;
