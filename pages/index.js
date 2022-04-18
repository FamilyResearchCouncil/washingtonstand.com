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
                  <NewsList list={props.pageProps.trending}/>
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

    let publication = {};
    let publications = [];

    let pageProps = {};
    let displayedItemsArray = [];
    let trendingList = [];

    await fetch(`https://api.frc.org/api/webjson/frc/script-generated/washington_stand_featured_article.json`)
        .then(res => res.json())
        .then(
            (result) => {
                pageProps.leadStory = result.shift();
                displayedItemsArray.push(pageProps.leadStory.ITEM_CODE);
            },
            (error) => {

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
            (error) => {
                // console.log(error);
            }
        );

    await fetch(`https://api.frc.org/api/webjson/frc/script-generated/item_listing_NA.json`)
        .then(res => res.json())
        .then(
            (result) => {
                publications = result.filter(item =>
                    !displayedItemsArray.includes(item.ITEM_CODE)
                );

                while (pageProps.topStories.length < 4) {
                    publication = publications.shift();
                    displayedItemsArray.push(publication.ITEM_CODE);
                    pageProps.topStories.push(publication);
                }

            },
            (error) => {

            }
        );

    await fetch(`https://api.frc.org/api/webjson/frc/script-generated/washington_stand_trending_list.json`)
        .then(res => res.json())
        .then(
            (result) => {
                pageProps.trending = [];
                trendingList = result;
                trendingList = trendingList.splice(trendingList.length-4,trendingList.length);
                trendingList.forEach(item => {
                    publications.forEach((pub,index) => {
                        if (pub.ITEM_CODE === item.ITEM_CODE && !displayedItemsArray.includes(pub.ITEM_CODE)) {
                            pageProps.trending.push(pub);
                            displayedItemsArray.push(pub.ITEM_CODE);
                            publications.splice(index, 1);

                        }
                    });
                });
            },
            (error) => {
                // console.log(error);
            }
        );



    pageProps.displayedItemsArray = displayedItemsArray;


    pageProps.pastPublications = publications;

    return {
        props: {
            pageProps
        },
        revalidate: 10
    };

}

export default Home;
