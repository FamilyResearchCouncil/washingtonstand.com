import { getServerSideSitemapIndex, getServerSideSitemap } from 'next-sitemap';
import GetPublications from "../helpers/GetPublications";

export const getServerSideProps = async (ctx) => {

    const allPublications = await GetPublications();
    const publicationUrlList = allPublications.map(publication => {
        return {
            loc: publication.CANONICAL_URL,
            lastmod: publication.START_DATE,
            changefreq: "never",
            priority: 0.8,
            alternateRefs: [],
            trailingSlash: false
        }
    });

    return getServerSideSitemap( ctx, publicationUrlList );
}

// Default export to prevent next.js errors
export default function SitemapIndex() {}