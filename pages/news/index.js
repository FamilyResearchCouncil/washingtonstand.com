import HeadTag from "../../components/layout/HeadTag";
import {StyledContentContainer} from "../../components/layout/sections/contentContainer";
import GetPublications from "../../helpers/GetPublications";
import PaginatedItems from "../../components/subComponents/PaginatedList";
import {PageToFooterSpacing} from "../../components/subComponents/PageToFooterSpacing";
import {mapArrayRemovingKeys} from "../../helpers/DataManipulators";

const NewsPage = (props) => (
    <>
        <HeadTag title="News" description="" />
        <StyledContentContainer>
            <PaginatedItems itemsPerPage={9} itemList={props.publications} columnClass={`columns-3`} displayByLine={true}/>
        </StyledContentContainer>
        <PageToFooterSpacing />
    </>
);

export async function getStaticProps() {

    let publications = await GetPublications(['NA']);

    publications =  mapArrayRemovingKeys(publications,["ITEM_CODE","URL_SLUG","ITEM_DESC","ITEM_TYPE","TYPE_DESC","SCREENCAP_IMAGE","AUTHOR_ID_LIST","FULL_DATE","START_DATE","authorDetailsArray"]);

    return {
        props: {publications},
        revalidate: 120
    };
}

export default NewsPage;
