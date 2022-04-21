import React, { useEffect, useState } from "react";
import HeadTag from "../../../components/layout/HeadTag";
import Image from "next/image";
import {StyledContentContainer} from "../../../components/layout/sections/contentContainer";
import styled from "styled-components";
import GetPublications from "../../../helpers/GetPublications";

const TopicGrid = styled.div`
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

const Topics = (props) => {
    return (
        <>
            <HeadTag title={props.title} description={props.title}/>
            <StyledContentContainer>
                <h1>{props.title}</h1>
                <TopicGrid>
                {
                    props.publicationList.map(item => (
                        <article>
                            <Image src={item.SCREENCAP_IMAGE} width={763} height={400} layout='responsive'/>
                            <h2>{item.ITEM_DESC}</h2>
                            {/*<p>{item.SUMMARY_TEXT}</p>*/}
                        </article>
                    ))
                }
                </TopicGrid>
            </StyledContentContainer>
        </>
    );
}

const formatDisplayTopic = (topicSlug) => {
    let wordArray = topicSlug.split("-").map(word => word.toUpperCase());
    return wordArray.join(" ");
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

    console.log(topicPathArray);

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
                pageProps.title = formatDisplayTopic(pageId);
            },
            (error) => {
                console.log(error);

            }
        );

    return {
        props: {...pageProps},
        revalidate: 10
    };
}

export default Topics;