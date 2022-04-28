import GetAuthorsDetails from "./GetAuthorsDetails";
import {getPublicationAuthorArray} from "./DataManipulators";

const GetPublications = async() => {

    const responseNa =  await fetch(`https://api.frc.org/api/webjson/frc/script-generated/item_listing_NA.json`);
    const newsArticles = await responseNa.json();

    const responseCc =  await fetch(`https://api.frc.org/api/webjson/frc/script-generated/item_listing_CC.json`);
    const commentary = await responseCc.json();

    const allAuthorDetails = await GetAuthorsDetails();

    const publications = newsArticles.concat(commentary);
    const sortedPubs = publications.sort((pubA,pubB) => Date.parse(pubB.START_DATE) - Date.parse(pubA.START_DATE));

    return sortedPubs.map(publication => {
        let thisPub = publication;
        thisPub.authorDetailsArray = getPublicationAuthorArray(publication.AUTHOR_ID_LIST,allAuthorDetails);
        return thisPub;
    })
}

export default GetPublications;

