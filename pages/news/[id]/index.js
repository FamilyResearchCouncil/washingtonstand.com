import React, { useState, useEffect } from "react";
import HeadTag from "../../../components/layout/HeadTag";
import Image from "next/image";
import {StyledContentContainer} from "../../../components/layout/sections/contentContainer";
import {StyledReadingSection} from "../../../components/subComponents/ReadingTextBlock";
import DisplayByLine from "../../../components/subComponents/DisplayByLine";
import DisplayPublicationHtml from "../../../components/subComponents/DisplayPublicationHtml";
import GetPublications from "../../../helpers/GetPublications";
import styled from "styled-components";
import TopicList from "../../../components/subComponents/TagLinkList";
import GetAuthorsDetails from "../../../helpers/GetAuthorsDetails";
import {getPublicationAuthorArray} from "../../../helpers/DataManipulators";
import FlameImage from "../../../components/subComponents/FlameImage";
import {PublicationTypeGreyText} from "../../../components/subComponents/PublicationTypeGreyText";
import AuthorTeaserBios from "../../../components/subComponents/AuthorTeaserBios";
import {PageToFooterSpacing} from "../../../components/subComponents/PageToFooterSpacing";
import SocialSharing from "../../../components/subComponents/SocialSharing";
import Script from "next/script";
import * as gtag from "../../../lib/ga";

const leadStoryTypeStyle = {
    display: "block",
    marginTop: "2rem"
}

const TitleH1 = styled.h1`
  font-family: ${({theme}) => theme.fonts.titleText};
  font-size: 4rem;
  font-weight: 700;
  margin: 0 0 1rem;

  @media (min-width: ${({ theme }) => theme.breakPoints.medium}) {
    font-size: 5.5rem;
  }
`

export const TopDisplayDiv = styled.div`
    max-width: 1100px;
    margin: 0 auto;
`

const OuterIframeDiv = styled.div`
    position: relative; 
    display: block;
    max-width: 100%;
`

const InnerIframeDiv = styled.div`
  padding-top: 56.25%;
  
  iframe {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }
`

const Post = (props) => {
    const [downloadTracked,setDownloadTracked] = useState(false);


    // useEffect(() =>{
    //     if (!downloadTracked){
    //         fetch(`https://api.frc.org/api/webtext/${props.ITEM_CODE}.json?trackDownload=${(process.env.NEXT_PUBLIC_TRACK_DOWNLOAD)?process.env.NEXT_PUBLIC_TRACK_DOWNLOAD:"1"}`)
    //             .then(res => res.text())
    //             .then(data => {
    //                 setDownloadTracked(true);
    //                 }
    //             );
    //     }
    // },[])

    return (
        <>
            <HeadTag title={props.ITEM_DESC} description={props.SUMMARY_TEXT.slice(0,100)} article={props}/>
            {
                props.isPublished ?
                    <>
                    <StyledContentContainer>
                        <article>
                            <TopDisplayDiv>
                            {
                                props.IFRAME ?
                                    <OuterIframeDiv>
                                        <InnerIframeDiv dangerouslySetInnerHTML={props.iframeHtml}>

                                        </InnerIframeDiv>
                                    </OuterIframeDiv>
                                    : <Image src={props.SCREENCAP_IMAGE} width={763} height={400} layout='responsive'/>
                            }
                            <PublicationTypeGreyText style={leadStoryTypeStyle}>{props.TYPE_DESC}</PublicationTypeGreyText>
                            <TitleH1 dangerouslySetInnerHTML={{__html: props.ITEM_DESC}} />
                            <DisplayByLine personalIdArray={props.authorArray} authorArray={props.authorDetailsArray} DISPLAY_MEDIA_DATE={props.DISPLAY_MEDIA_DATE}/>
                            <SocialSharing {...props} />
                            </TopDisplayDiv>
                            <StyledReadingSection>
                                <DisplayPublicationHtml displayHtml={props.displayHtml}/>
                                <TopicList list={props.TAG_LIST}/>
                                {
                                    props.authorDetailsArray.length ?
                                        <AuthorTeaserBios authors={props.authorDetailsArray} />
                                        : <></>
                                }
                            </StyledReadingSection>
                            <FlameImage />
                        </article>
                        <PageToFooterSpacing />
                    </StyledContentContainer>
                    </>
                    :
                    <StyledContentContainer>
                    <center>This publication is unavailable</center>
                    </StyledContentContainer>
            }
        </>
    );
}

export const getStaticPaths = async () => {

    const publications = await GetPublications(['NA']);

    const trimmedPublicationList = (publications.length > 80) ? publications.slice(0,80) : publications;

    const publishPathsArray = trimmedPublicationList.map((pub) => ({
        params: { id: pub.URL_SLUG}
    }));

    return {
        paths: publishPathsArray,
        fallback: "blocking"
    };
}


export const getStaticProps = async (context) => {

    const checkIsPublished = (publication) => {
        return (
            "ONLINE,APPROVE".includes(publication.STATUS)
            &&
            (
                isNaN(Date.parse(publication.END_DATE))
                ||
                Date.parse(publication.END_DATE) > Date.now()
            )
        )
    }

    const authors = await GetAuthorsDetails();
    const pageId = context.params.id;
    let pageProps = {};

    pageProps.iframeHtml = false;
    pageProps.displayHtml = {
        __html: `<h1>Oops! Page not found</h1><p>We appear to be experiencing technical difficulties. Please feel free to try again or <a href="https://frc.org/contact-frc">contact us</a>.</p>`
    }
    await fetch(`https://api.frc.org/api/frc/web-url-item/${pageId}`)
        .then(res => res.json())
        .then(
            (result) => {
                pageProps = result.pop();
                pageProps.iframeHtml = (pageProps.IFRAME) ? {
                    __html: pageProps.IFRAME
                } : false;
                pageProps.displayHtml = {
                    __html: pageProps.FULL_TEXT
                }
            },
            (error) => {
                // console.log(error);

            }
        );

    pageProps.authorDetailsArray = getPublicationAuthorArray(pageProps.AUTHOR_ID_LIST,authors);

    pageProps.isPublished = checkIsPublished(pageProps);

    return {
        props: {...pageProps},
        revalidate: 120
    };
}

export default Post;