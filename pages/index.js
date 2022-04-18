import HeadTag from "../components/layout/HeadTag"
import styles from '../styles/Main.module.css'
import {StyledContentContainer} from "../components/layout/sections/contentContainer";
import {StyledGreySection} from "../components/layout/sections/GeySection";
import styled from 'styled-components';
import {useAPIPubs} from "../contexts/PublicationListContext";
import TopItemsList from "../components/HomeTopStories";
import FeaturedPublication from "../components/HomeFeaturedStory";
import NewsList from "../components/subComponents/NewsList";

const LeadingGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  
  @media (min-width: ${({ theme }) => theme.breakPoints.large}) {
    grid-template-columns: 1.1fr .2rem .9fr;
    > div:nth-child(2) {
      background-color: ${ ({theme}) => theme.colors.alternateGrey };
    }
  }
`;

const PreviousNewsGrid = styled.div`
  display: grid;
  grid-gap: 3rem;

  @media (min-width: ${({ theme }) => theme.breakPoints.large}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Home = (props) => (
  <>
      <HeadTag title="The Washington Stand" description="" />
      <h1 style={{ fontSize: '0px', display: "none" }}>The Washington Stand</h1>
      <StyledContentContainer>
          <h2>LATEST</h2>
          <LeadingGrid>
              <FeaturedPublication {...props.pageProps.leadStory} />
              <div />
              <div>
                  <TopItemsList list={props.pageProps.topStories} />
              </div>
          </LeadingGrid>
      </StyledContentContainer>
      <StyledGreySection>
          <StyledContentContainer>
              <h2>JOIN OUR NEWS LETTER</h2> email sign up
          </StyledContentContainer>
      </StyledGreySection>
      <StyledContentContainer>
          <LeadingGrid>
              <div>
                  <h2>PREVIOUS ARTICLES</h2>
                  <PreviousNewsGrid>
                      <NewsList list={props.pageProps.pastPublications}/>
                  </PreviousNewsGrid>
              </div>
              <div />
              <div>
                  <h2>TRENDING</h2>
              </div>
          </LeadingGrid>
      </StyledContentContainer>
      <StyledContentContainer>
          Promo Banners
      </StyledContentContainer>
      <StyledContentContainer>
          <h2>AROUND THE WEB</h2>
      </StyledContentContainer>
  </>
);


export async function getStaticProps(context) {
    // const { res } = context;
    // res.setHeader('Cache-Control', `s-maxage=60, stale-while-revalidate`);

    let publications = [];

    let pageProps = {};
    let displayedItemsArray = [];
    let pastItemsArray = [];

    await fetch(`https://api.frc.org/api/webjson/frc/script-generated/washington_stand_featured_article.json`)
        .then(res => res.json())
        .then(
            (result) => {
                pageProps.leadStory = result.pop();
                displayedItemsArray.push(pageProps.leadStory.ITEM_CODE);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log(error);

            }
        );

      await fetch(`https://api.frc.org/api/webjson/frc/script-generated/washington_stand_top_articles.json`)
          .then(res => res.json())
          .then(
              (result) => {
                    pageProps.topStories = result;
                    pageProps.topStories.forEach(item => {
                       displayedItemsArray.push(item.ITEM_CODE);
                    });
              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
                    console.log(error);

              }
          );

      await fetch(`https://api.frc.org/api/webjson/frc/script-generated/item_listing_NA.json`)
          .then(res => res.json())
          .then(
              (result) => {
                    console.log(result);
                    publications = result;
              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
                    console.log(error);

              }
          );



    pageProps.displayedItemsArray = displayedItemsArray;


    console.log(publications);

    pastItemsArray = publications.filter(item =>
        !displayedItemsArray.includes(item.ITEM_CODE)
    );

    let item = {};

    while (pageProps.topStories.length < 4) {
        item = pastItemsArray.pop();
        displayedItemsArray.push(item.ITEM_CODE);
        pageProps.topStories.push(item);
    }

    pageProps.pastPublications = pastItemsArray;

    return {
        props: {
            pageProps
        },
        revalidate: 10
    };

}

export default Home;
