import HeadTag from "../../components/layout/HeadTag";
import {StyledContentContainer} from "../../components/layout/sections/contentContainer";
import GetPublications from "../../helpers/GetPublications";
import PaginatedItems from "../../components/subComponents/PaginatedList";

const NewsPage = (props) => (
    <>
        <HeadTag title="News & Commentary" description="" />
        <StyledContentContainer>
            <PaginatedItems itemsPerPage={9} itemList={props.publications} columnClass={`columns-3`} displayByLine={true}/>
        </StyledContentContainer>
    </>
);

export async function getStaticProps() {
    const publications = await GetPublications();

    return {
        props: {publications},
        revalidate: 60
    };
}

export default NewsPage;
