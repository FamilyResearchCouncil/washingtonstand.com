const GetPublications = async() => {

    const response =  await fetch(`https://api.frc.org/api/webjson/frc/script-generated/item_listing_NA.json`);
    const publications = await response.json();

    return publications
}

export default GetPublications;

