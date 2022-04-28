
export const getPublicationAuthorArray = (publicationAuthorList, allAuthorsArray) => {

    const defaultAuthorObject = {
        "PERSONAL_ID" : "5410985",
        "AUTHOR_NAME" : "Family Research Council",
        "FIRST_NAME" : "Family Research",
        "LAST_NAME" : "Council",
        "AUTHOR_IMG" : "https://www.frc.org/img/domain/frc/logo_lg.png",
        "AUTHOR_TITLE" : "",
        "TWITTER_HANDLE" : "",
        "FACEBOOK_HANDLE" : "",
        "BIO_ITEM" : "",
        "AUTHOR_SLUG" : "family-research-council"
    }

    let authorArray = publicationAuthorList.split(",");

    return authorArray.map(authorId => {
        let authorObject = allAuthorsArray.find(authorDetails => authorDetails.PERSONAL_ID == authorId)
        return authorObject ? authorObject :  defaultAuthorObject;
    });
}

export const formatTopicForDocumentTitle = (topicSlug) => {
    let wordArray = topicSlug.split("-").map(word => {
        let title=`${word.charAt(0).toUpperCase()+word.slice(1)}`;
        return title;
    });
    return wordArray.join(" ");
}

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