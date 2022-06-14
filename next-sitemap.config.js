const config = {
    siteUrl: process.env.SITE_URL || 'https://washingtonstand.com',
    changefreq: 'daily',
    priority: 0.8,
    sitemapSize: 5000,
    generateRobotsTxt: true,
    exclude: ['/newsletter/confirmation'],
    transform: async (config, path) => {
        return {
            loc: path,
            changefreq: config.changefreq,
            priority: config.priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        }
    },
    additionalPaths: async (config) => [
        await config.transform(config, '/additional-page'),
    ],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
            {
                userAgent: 'test-bot',
                allow: ['/topic', '/news','/commentary'],
            },
            {
                userAgent: 'black-listed-bot',
                disallow: ['/api','/all'],
            },
        ],
        additionalSitemaps: [
            'https://washingtonstand.com/sitemap-publications.xml'
        ],
    },
}