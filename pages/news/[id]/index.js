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

const TitleH1 = styled.h1`
  font-family: ${({theme}) => theme.fonts.titleText};
  font-size: 4rem;
  font-weight: 400;
  margin: 1rem 0rem;

  @media (min-width: ${({ theme }) => theme.breakPoints.medium}) {
    font-size: 5.5rem;
  }
`

const TopDisplayDiv = styled.div`
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


    useEffect(() =>{
        if (!downloadTracked){
            fetch(`https://api.frc.org/api/webtext/${props.ITEM_CODE}.json?trackDownload=${(process.env.NEXT_PUBLIC_TRACK_DOWNLOAD)?process.env.NEXT_PUBLIC_TRACK_DOWNLOAD:"1"}`)
                .then(res => res.text())
                .then(data => {
                    setDownloadTracked(true);
                    }
                );
        }
    },[])

    return (
        <>
            <HeadTag title={props.ITEM_DESC} description={props.SUMMARY_TEXT}/>
            {
                props.isPublished ?
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
                            <TitleH1 dangerouslySetInnerHTML={{__html: props.ITEM_DESC}} />
                            <DisplayByLine personalIdArray={props.authorArray} authorArray={props.authorDetailsArray} DISPLAY_MEDIA_DATE={props.DISPLAY_MEDIA_DATE}/>
                            </TopDisplayDiv>
                            <StyledReadingSection>
                                <DisplayPublicationHtml displayHtml={props.displayHtml}/>
                                <TopicList list={props.TAG_LIST}/>
                            </StyledReadingSection>
                            <center>
                                <Image src="/img/Flame_icon.svg" height={50} width={50}/>
                            </center>
                        </article>
                    </StyledContentContainer>
                    :
                    <StyledContentContainer>
                    <center>Unavailable</center>
                    </StyledContentContainer>
            }
        </>
    );
}

export async function getStaticPaths() {

    const publications = await GetPublications();

    const publishPathsArray = publications.map((pub) => ({
        params: { id: pub.ITEM_CODE}
    }));

    return {
        paths: publishPathsArray,
        fallback: "blocking"
    };
}


export async function getStaticProps(context) {

    // console.log("type is ", typeof process.env.PUBLICATION_STATUS_CHECK_LIST);
    // console.log("value is ", process.env.PUBLICATION_STATUS_CHECK_LIST);

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

    await fetch(`https://api.frc.org/api/webtext/${pageId}.json?trackDownload=0`)
        .then(res => res.json())
        .then(
            (result) => {
                pageProps = result.pop();
                pageProps.iframeHtml = (pageProps.IFRAME) ? {
                    __html: pageProps.IFRAME
                } : false;
            },
            (error) => {
                // console.log(error);

            }
        );

    await fetch(`https://api.frc.org/api/webtext/${pageId}.cfm?trackDownload=0`)
        .then(res => res.text())
        .then(
            (result) => {
                pageProps.displayHtml = {
                    __html: result
                }
            },
            (error) => {

            }
        );

    pageProps.authorDetailsArray = getPublicationAuthorArray(pageProps.AUTHOR_ID_LIST,authors);

    pageProps.isPublished = checkIsPublished(pageProps);

    return {
        props: {...pageProps},
        revalidate: 60
    };
}

export default Post;