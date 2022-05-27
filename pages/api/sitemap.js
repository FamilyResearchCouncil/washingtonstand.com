import { SitemapStream, streamToPromise } from 'sitemap';
import GetPublications from "../../helpers/GetPublications";

export default async (req, res) => {
    try {

        const smStream = new SitemapStream({
            hostname: `https://${req.headers.host}`,
            cacheTime: 600000,
        });

        // List of posts
        const posts = await GetPublications();

        // Create each URL row
        posts.forEach(post => {
            smStream.write({
                url: `${post.TYPE_DESC.toLowerCase()}/${post.URL_SLUG}`,
                changefreq: 'daily',
                priority: 0.9
            });
        });

        // End sitemap stream
        smStream.end();

        // XML sitemap string
        const sitemapOutput = (await streamToPromise(smStream)).toString();

        // Change headers
        res.writeHead(200, {
            'Content-Type': 'application/xml'
        });

        // Display output to user
        res.end(sitemapOutput);
    } catch(e) {
        console.log(e)
        res.send(JSON.stringify(e))
    }

}