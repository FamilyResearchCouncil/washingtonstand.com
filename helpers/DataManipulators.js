
export const mapArrayRemovingKeys = (publicationArray, keysToKepArray) => {
    return publicationArray.map(publication => {
       let newPublicationData = {}
       keysToKepArray.forEach(keyName => { newPublicationData[keyName] = publication[keyName] });
       return newPublicationData;
    });
}

// accepts a comma separated list or array of author ID and
// an array of all the author data and returns an array of data for only the
// authors in the list.
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

// concatenates author names into a displayable comma separated list
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

// formats a dash separated topic slug for use in a document
// title tag
export const formatTopicForDocumentTitle = (topicSlug) => {
    let wordArray = topicSlug.split("-").map(word => {
        let title=`${word.charAt(0).toUpperCase()+word.slice(1)}`;
        return title;
    });
    return wordArray.join(" ");
}

// formats a dash separated topic slug for display in an
// <h*> tag.
export const formatTopicForDisplay = (topicSlug) => {
    let wordArray = topicSlug.split("-").map(word => word.toUpperCase());
    return wordArray.join(" ");
}

const getTopicFormatForDisplayAndTitle = (topicSlug) => {
    let topicDetails = {};
    topicDetails.displayTitle = formatTopicForDisplay(topicSlug);
    topicDetails.documentTitle = formatTopicForDocumentTitle(topicSlug);
    return topicDetails;
}

export default getTopicFormatForDisplayAndTitle;