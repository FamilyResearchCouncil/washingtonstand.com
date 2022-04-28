import React, { useEffect, useState } from "react";
import HeadTag from "../../../components/layout/HeadTag";
import {StyledReadingSection} from "../../../components/subComponents/readingTextBlock";
import GetPublications from "../../../helpers/GetPublications";
import PaginatedItems from "../../../components/subComponents/PaginatedList";
import getTopicFormatForDisplayAndTitle, {getPublicationAuthorArray} from "../../../helpers/DataManipulators";
import GetAuthorsDetails from "../../../helpers/GetAuthorsDetails";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import appUrls from "../../../storage/baseUrls.json";

const LeadArticle = styled.article`
  display: grid;
  margin-bottom: 4rem;
  
  h2 {
    font-family: ${({theme}) => theme.fonts.titleText};
    font-size: 3.6rem;
    margin-bottom: 0rem;
  }
`;

const TopicListWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const Topics = (props) => {
    return (
        <>
            <HeadTag title={props.topicTexts.documentTitle} description={props.SUMMARY_TEXT}/>
            <StyledReadingSection>
                <h1>{props.topicTexts.displayTitle}</h1>
                <LeadArticle>
                    <Link href={`${appUrls.urlDirectories.news}/${props.firstPublication.ITEM_CODE}`}>
                        <a>
                            <Image src={props.firstPublication.SCREENCAP_IMAGE} width={763} height={400} layout='responsive'/>
                            <h2>{props.firstPublication.ITEM_DESC}</h2>
                        </a>
                    </Link>
                    <div>
                        <i>{props.firstPublication.FULL_DATE}</i> | {props.firstPublication.authorDetailsArray[0].AUTHOR_NAME}
                    </div>
                </LeadArticle>
                <TopicListWrapper>
                    <PaginatedItems itemsPerPage={6} itemList={props.publicationList} columnClass={``}/>
                </TopicListWrapper>
            </StyledReadingSection>
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