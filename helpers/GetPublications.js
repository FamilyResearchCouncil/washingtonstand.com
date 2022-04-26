const GetPublications = async() => {

    const responseNa =  await fetch(`https://api.frc.org/api/webjson/frc/script-generated/item_listing_NA.json`);
    const newsArticles = await responseNa.json();

    const responseCc =  await fetch(`https://api.frc.org/api/webjson/frc/script-generated/item_listing_CC.json`);
    const commentary = await responseCc.json();

    const publications = newsArticles.concat(commentary);
    const sortedPubs = publications.sort((pubA,pubB) => Date.parse(pubB.START_DATE) - Date.parse(pubA.START_DATE));

    return sortedPubs
}

export default GetPublications;

