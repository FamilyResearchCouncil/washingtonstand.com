import { getServerSideSitemap } from 'next-sitemap';
import GetPublications from "../helpers/GetPublications";

export const getServerSideProps = async (ctx) => {

    let allPublications = await GetPublications();

    let topicPathArray = [];
    let topicListArray = [];

    // pull a list of "topic" paths from the publication list. "lastmod" is assumed to be equal to the most recent article's publication date
    allPublications.forEach(pub => {
        pub.TAG_LIST.split(',').forEach(topic => {
            if (!topicListArray.includes(topic)) {
                let pubDate = new Date(pub.START_DATE);
                topicListArray.push(topic);
                topicPathArray.push({
                    lastmod: pubDate.toISOString(),
                    loc:`https://washingtonstand.com/topic/${topic}`
                });
            }
        });
    });

    // transform top array to use the same object type as getServerSideSitemap
    topicPathArray = topicPathArray.map(topic => {
        return {
            loc: topic.loc,
            lastmod: topic.lastmod,
            changefreq: "monthly",
            priority: 0.6,
            alternateRefs: [],
            trailingSlash: false
        }
    });

    // do the same transformation on the publications
    allPublications = allPublications.map(publication => {
        let pubDate = new Date(publication.START_DATE);
        return {
            loc: publication.CANONICAL_URL,
            lastmod: pubDate.toISOString(),
            changefreq: "never",
            priority: 0.8,
            alternateRefs: [],
            trailingSlash: false
        }
    });

    // merge the 2 arrays for site map generation
    const publicationUrlList = allPublications.concat(topicPathArray);

    return getServerSideSitemap( ctx, publicationUrlList );
}

// Default export to prevent next.js errors
export default function SitemapIndex() {}