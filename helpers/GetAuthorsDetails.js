/**
 * GetAuthorsDetails - fetches all author details, which are parsed/used in numerous locations throughout the application
 * @returns {array}
 */
const GetAuthorsDetails = async() => {

    let authors = []

    try {
        const response =  await fetch(`https://apiv2.frc.org/api/webjson/frc/script-generated/news_author_details_array.json?cached=3`);
        authors = await response.json();
    } catch (e) {
        console.log("Error in GetAuthorsDetails",e);
    }
    return authors
}

export default GetAuthorsDetails;

