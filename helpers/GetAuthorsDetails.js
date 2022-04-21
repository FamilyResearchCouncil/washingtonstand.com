const GetAuthorsDetails = async() => {

    const response =  await fetch(`https://api.frc.org/api/webjson/frc/script-generated/news_author_details_array.json`);
    const authors = await response.json();

    return authors
}

export default GetAuthorsDetails;

