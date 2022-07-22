
/**
 * mapArrayRemovingKeys - used to transform arrays of objects to smaller object that only contain specified properties,
 * used in publication listing pages (all/, news/, commentary/)
 *
 * @param {array} publicationArray - array of objects representative of publications
 * @param {array} keysToKeepArray - array of key names in the publication object that will be included in the returned
 * array of objects.
 * @returns {array}
 */

export const mapArrayRemovingKeys = (publicationArray, keysToKeepArray) => {
    return publicationArray.map(publication => {
       let newPublicationData = {}
       keysToKeepArray.forEach(keyName => { newPublicationData[keyName] = publication[keyName] });
       return newPublicationData;
    });
}


/**
 * getPublicationAuthorArray - used to generate an array of author objects from an array or comma separated list of author ID
 *
 * @param {array||string} publicationAuthorList - an array or comma separated list of author IDs
 * @param {array} allAuthorsArray - an array of objects that represent individual author data
 * @returns {array}
 */

export const getPublicationAuthorArray = (publicationAuthorList, allAuthorsArray) => {

    const defaultAuthorObject = {
        "PERSONAL_ID" : "5410985",
        "AUTHOR_NAME" : "Family Research Council",
        "FIRST_NAME" : "Family Research",
        "LAST_NAME" : "Council",
        "AUTHOR_IMG" : "",
        "AUTHOR_TITLE" : "",
        "TWITTER_HANDLE" : "",
        "FACEBOOK_HANDLE" : "",
        "BIO_ITEM" : "",
        "AUTHOR_SLUG" : "family-research-council"
    }

    let authorArray = (typeof publicationAuthorList === "string") ? publicationAuthorList.split(",") : publicationAuthorList;

    return authorArray.map(authorId => {
        let authorObject = allAuthorsArray.find(authorDetails => authorDetails.PERSONAL_ID == authorId)
        return authorObject ? authorObject :  defaultAuthorObject;
    });
}


/**
 * concatAuthorNames - used to generate a comma separated list of author names from an array of author objects.
 *
 * @param {array} authorsDetailArray - an array of objects representing author details. Each should have an AUTHOR_NAME property.
 * @returns {string}
 */

export const concatAuthorNames = (authorsDetailArray) => {
    let authorString = authorsDetailArray.map((author,idx) => {
        let spacerString = "";
        if (idx !== (authorsDetailArray.length-1)) {
            spacerString = (idx === (authorsDetailArray.length-2)) ? ", and " : ", ";
            spacerString = (authorsDetailArray.length === 2) ? " and " : spacerString;
        }

        return `${author.AUTHOR_NAME}${spacerString}`;
    }).join("");
    return authorString;
}

/**
 * formatTopicForDocumentTitle - accepts a dash separated slug and returns a string formatted for the HTML title tag
 *
 * @param {string} topicSlug - a comma separated string representing a slug used in the /topic directory
 * @returns {string}
 */
export const formatTopicForDocumentTitle = (topicSlug) => {
    let wordArray = topicSlug.split("-").map(word => {
        let title=`${word.charAt(0).toUpperCase()+word.slice(1)}`;
        return title;
    });
    return wordArray.join(" ");
}

/**
 * formatTopicForDisplay - accepts a dash separated slug and returns a string formatted for display in an HTML element. Usually an <h1>
 *
 * @param {string} topicSlug - a comma separated string representing a slug used in the /topic directory
 * @returns {string}
 */

export const formatTopicForDisplay = (topicSlug) => {
    let wordArray = topicSlug.split("-").map(word => word.toUpperCase());
    return wordArray.join(" ");
}

/**
 * getTopicFormatForDisplayAndTitle - accepts a dash separated slug and returns an object with it formatted for both a <title> and <h1>
 *
 * @param {string} topicSlug - a comma separated string representing a slug used in the /topic directory
 * @returns {object}
 */
const getTopicFormatForDisplayAndTitle = (topicSlug) => {
    let topicDetails = {};
    topicDetails.displayTitle = formatTopicForDisplay(topicSlug);
    topicDetails.documentTitle = formatTopicForDocumentTitle(topicSlug);
    return topicDetails;
}

export default getTopicFormatForDisplayAndTitle;