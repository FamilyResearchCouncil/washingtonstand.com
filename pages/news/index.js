import HeadTag from "../../components/layout/HeadTag";
import NewsList from "../../components/subComponents/NewsList";
import {StyledContentContainer} from "../../components/layout/sections/contentContainer";
import React from "react";
import GetPublications from "../../helpers/GetPublications";
import styled from "styled-components";

const ListingGrid = styled.div`
  display: grid;
  grid-gap: 3rem;

  h2 {
    
  }
  
  @media (min-width: ${({ theme }) => theme.breakPoints.medium}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: ${({ theme }) => theme.breakPoints.large}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  
`;

const NewsPage = (props) => (
    <>
        <HeadTag title="News" description="" />
        <StyledContentContainer>
            {/*{JSON.stringify(props.publications)}*/}
            <ListingGrid>
            <NewsList displayImg={true} list={props.publications}/>
            </ListingGrid>
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
