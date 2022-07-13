import HeadTag from "../../components/layout/HeadTag";
import {StyledContentContainer} from "../../components/layout/sections/contentContainer";
import GetPublications from "../../helpers/GetPublications";
import PaginatedItems from "../../components/subComponents/PaginatedList";
import {PageToFooterSpacing} from "../../components/subComponents/PageToFooterSpacing";
import GenerateRssFeed from "../../helpers/GenerateRssFeed";
import React from "react";
import GetAuthorsDetails from "../../helpers/GetAuthorsDetails";
import {mapArrayRemovingKeys} from "../../helpers/DataManipulators";

const NewsPage = (props) => (
    <>
        <HeadTag title="News & Commentary" description="" />
        <StyledContentContainer>
            <PaginatedItems itemsPerPage={9} itemList={props.publications} columnClass={`columns-3`} displayByLine={true}/>
        </StyledContentContainer>
        <PageToFooterSpacing />
    </>
);

export async function getStaticProps() {

    let publications = await GetPublications();
    const authors = await GetAuthorsDetails();

    GenerateRssFeed("all",publications,authors);
    GenerateRssFeed("news",publications.filter(pub => pub.ITEM_TYPE == "NA"),authors);
    GenerateRssFeed("commentary",publications.filter(pub => pub.ITEM_TYPE == "CC"),authors);

    publications =  mapArrayRemovingKeys(publications,["ITEM_CODE","ITEM_DESC","URL_SLUG","ITEM_TYPE","TYPE_DESC","SCREENCAP_IMAGE","AUTHOR_ID_LIST","FULL_DATE","START_DATE","authorDetailsArray"]);

    return {
        props: {publications},
        revalidate: 120
    };
}

export default NewsPage;
