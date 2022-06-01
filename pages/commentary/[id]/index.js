import Post, {getStaticProps} from "../../news/[id]";
import GetPublications from "../../../helpers/GetPublications";


export const getStaticPaths = async () => {

    const publications = await GetPublications(['CC']);

    const trimmedPublicationList = (publications.length > 40) ? publications.slice(0,40) : publications;

    const publishPathsArray = trimmedPublicationList.map((pub) => ({
        params: { id: pub.URL_SLUG}
    }));

    return {
        paths: publishPathsArray,
        fallback: "blocking"
    };
}

export {getStaticProps};

export default Post;