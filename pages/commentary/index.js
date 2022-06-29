import HeadTag from "../../components/layout/HeadTag";
import {StyledContentContainer} from "../../components/layout/sections/contentContainer";
import GetPublications from "../../helpers/GetPublications";
import PaginatedItems from "../../components/subComponents/PaginatedList";
import {PageToFooterSpacing} from "../../components/subComponents/PageToFooterSpacing";

const NewsPage = (props) => (
    <>
        <HeadTag title="Commentary" description="" />
        <StyledContentContainer>
            <PaginatedItems itemsPerPage={9} itemList={props.publications} columnClass={`columns-3`} displayByLine={true}/>
        </StyledContentContainer>
        <PageToFooterSpacing />
    </>
);

export async function getStaticProps() {
    const publications = await GetPublications(['CC']);

    return {
        props: {publications},
        revalidate: 60
    };
}

export default NewsPage;
