import React, { useState, useEffect } from "react";
import HeadTag from "../../../components/layout/HeadTag";
import Image from "next/image";
import {StyledContentContainer} from "../../../components/layout/sections/contentContainer";
import {StyledReadingSection} from "../../../components/subComponents/readingTextBlock";
import DisplayByLine from "../../../components/subComponents/DisplayByLine";
import DisplayPublicationHtml from "../../../components/subComponents/DisplayPublicationHtml";
import GetPublications from "../../../helpers/GetPublications";
import styled from "styled-components";

const OuterDiv = styled.div`
    position: relative; 
    display: block;
    max-width: 100%;
`

const InnerDiv = styled.div`
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
                            {
                                props.IFRAME ?
                                    <OuterDiv>
                                        <InnerDiv dangerouslySetInnerHTML={props.iframeHtml}>

                                        </InnerDiv>
                                    </OuterDiv>
                                    : <Image src={props.SCREENCAP_IMAGE} width={763} height={400} layout='responsive'/>
                            }
                            <h1>{props.ITEM_DESC}</h1>
                            <DisplayByLine personalIdArray={props.authourArray} DISPLAY_MEDIA_DATE={props.DISPLAY_MEDIA_DATE}/>
                            <StyledReadingSection>
                                <DisplayPublicationHtml displayHtml={props.displayHtml}/>
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

    const checkIsPublished = (publication) => {
        return (
            process.env.PUBLICATION_STATUS_CHECK_LIST.includes(publication.STATUS)
            &&
            (
                isNaN(Date.parse(publication.END_DATE))
                ||
                Date.parse(publication.END_DATE) > Date.now()
            )
        )
    }

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

    pageProps.authourArray = pageProps.AUTHOR_ID_LIST.split(',');

    pageProps.isPublished = checkIsPublished(pageProps);

    return {
        props: {...pageProps},
        revalidate: 60
    };
}

export default Post;