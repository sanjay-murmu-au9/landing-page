/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://sanjay-murmu-au9.github.io/landing-page/',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [],
  },
  exclude: ['/admin/*', '/api/*'],
  // Create priority rules based on URL patterns
  transform: async (config, path) => {
    // Blog post pages get high priority
    if (path.startsWith('/blog/') && path !== '/blog') {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }
    
    // Main pages get highest priority
    if (path === '' || path === '/' || path === '/blog') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }
    
    // Legal/policy pages get lower priority
    if (['/privacy-policy', '/cookie-policy', '/disclaimer', '/term-condtion'].includes(path)) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.5,
        lastmod: new Date().toISOString(),
      };
    }
    
    // Default transformation for all other paths
    return {
      loc: path,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};
