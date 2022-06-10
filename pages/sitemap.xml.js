import { getServerSideSitemapIndex } from 'next-sitemap';
import GetPublications from "../helpers/GetPublications";

export const getServerSideProps = async (ctx) => {

    const allPublications = await GetPublications();
    const publicationUrlList = allPublications.map(publication => publication.CANONICAL_URL);

    return getServerSideSitemapIndex( ctx, publicationUrlList );
}

// Default export to prevent next.js errors
export default function SitemapIndex() {}