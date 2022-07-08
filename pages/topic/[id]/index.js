import React, { useEffect, useState } from "react";
import HeadTag from "../../../components/layout/HeadTag";
import {StyledReadingSection} from "../../../components/subComponents/ReadingTextBlock";
import GetPublications from "../../../helpers/GetPublications";
import PaginatedItems from "../../../components/subComponents/PaginatedList";
import getTopicFormatForDisplayAndTitle, {getPublicationAuthorArray} from "../../../helpers/DataManipulators";
import GetAuthorsDetails from "../../../helpers/GetAuthorsDetails";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import {concatAuthorNames} from "../../../helpers/DataManipulators";
import {PageToFooterSpacing} from "../../../components/subComponents/PageToFooterSpacing";

const LeadArticle = styled.article`
  display: grid;
  margin-bottom: 4rem;
  
  h2 {
    font-family: ${({theme}) => theme.fonts.titleText};
    font-size: 3.6rem;
    margin-bottom: 0rem;
  }
`;

const TopicH1 = styled.h1`
  color: ${({theme}) => theme.colors.primaryYellow}
`

const TopicListWrapper = styled.div`
  margin: 0 auto;
  article {
    display: grid;
    grid-gap: 1.5rem;
    grid-template-columns: 1fr 3fr;
    
    h2 {
      margin: 0;
    }
    
    span {
      margin-top: 0;
      font-size: 1.4rem;
    }

    @media (min-width: ${({ theme }) => theme.breakPoints.medium}) {
      grid-gap: 3rem;
      grid-template-columns: .8fr 1.2fr;
      h2 {
        font-size: 2.6rem;
      }
    }
    
  }
`;

const Topics = (props) => {
    return (
        <>
            <HeadTag title={props.topicTexts.documentTitle} description={`Washington Stand publications on the topic of ${props.topicTexts.documentTitle}`}/>
            <StyledReadingSection>
                <TopicH1>{props.topicTexts.displayTitle}</TopicH1>
                <LeadArticle>
                    <Link href={`/${props.firstPublication.TYPE_DESC.toLowerCase()}/${props.firstPublication.URL_SLUG}`}>
                        <a>
                            <Image src={props.firstPublication.SCREENCAP_IMAGE} width={763} height={400} layout='responsive'/>
                            <h2 dangerouslySetInnerHTML={{__html: props.firstPublication.ITEM_DESC}} />
                        </a>
                    </Link>
                    <div>
                        <i>{props.firstPublication.FULL_DATE}</i> | {concatAuthorNames(props.firstPublication.authorDetailsArray)}
                    </div>
                </LeadArticle>
                <TopicListWrapper>
                    <PaginatedItems itemsPerPage={6} itemList={props.publicationList} columnClass={``} displayByLine={true}/>
                </TopicListWrapper>
            </StyledReadingSection>
            <PageToFooterSpacing />
        </>
    );
}

export async function getStaticPaths() {
    let topicPathArray = [];

    const publications = await GetPublications();

    publications.forEach(pub => {
        pub.TAG_LIST.split(',').forEach(topic => {
           if (!topicPathArray.includes(topic)) topicPathArray.push(topic);
        });
    } );

    topicPathArray = (topicPathArray.length > 30) ? topicPathArray.slice(0,30) : topicPathArray;

    topicPathArray = topicPathArray.map((topic) => ({
        params: { id: topic}
    }));


    return {
        paths: topicPathArray,
        fallback: "blocking"
    };
}


export async function getStaticProps(context) {
    const pageId = context.params.id;

    let pageProps = {};

    await fetch(`https://api.frc.org/api/webjson/frc/script-generated/tag_listing_${pageId}.json`)
        .then(res => res.json())
        .then(
            (result) => {
                pageProps.publicationList = result;
            },
            (error) => {
                // console.log(error);

            }
        );


    const authors = await GetAuthorsDetails();

    pageProps.publicationList = pageProps.publicationList.map(publication => {
    // pageProps.publicationList.map(publication => {
        let thisPub = publication;
        thisPub.authorDetailsArray = getPublicationAuthorArray(publication.AUTHOR_ID_LIST,authors);
        // console.log(thisPub);
        return thisPub;
    })

    pageProps.firstPublication = pageProps.publicationList.shift();
    pageProps.topicTexts = getTopicFormatForDisplayAndTitle(pageId);

    return {
        props: {...pageProps},
        revalidate: 60
    };
}

export default Topics;