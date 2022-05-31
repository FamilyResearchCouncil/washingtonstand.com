import GetAuthorsDetails from "./GetAuthorsDetails";
import {getPublicationAuthorArray} from "./DataManipulators";

const GetPublications = async(typeArray) => {

    const publicationTypeArray = typeArray ? typeArray : ['NA','CC'];

    let publicationsPromises = [];
    let publications = [];

    for (let i=0; i < publicationTypeArray.length; i++) {
        const response = await fetch(`https://api.frc.org/api/webjson/frc/script-generated/item_listing_${publicationTypeArray[i]}.json?cached=1`);
        publicationsPromises.push(
            fetch(`https://api.frc.org/api/webjson/frc/script-generated/item_listing_${publicationTypeArray[i]}.json?cached=1`)
            .then(res => res.json())
            .then(data => publications.concat(data))
        );
    }

    const allPublications = await Promise.all(publicationsPromises);
    allPublications.forEach(publicationSet => {
        publications = publications.concat(publicationSet);
    })

    const sortedPubs = publications.sort((pubA,pubB) => Date.parse(pubB.START_DATE) - Date.parse(pubA.START_DATE));

    const allAuthorDetails = await GetAuthorsDetails();

    return sortedPubs.map(publication => {
        let thisPub = publication;
        thisPub.authorDetailsArray = getPublicationAuthorArray(publication.AUTHOR_ID_LIST, allAuthorDetails);
        return thisPub;
    })
}

export default GetPublications;

