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
            <StyledContentContainer>
                {/*{JSON.stringify(props)}*/}
                <article>
                    {
                        props.IFRAME ?
                            <OuterDiv>
                                <InnerDiv dangerouslySetInnerHTML={props.iframeHtml}>

                                </InnerDiv>
                            </OuterDiv>
                            : <Image src={props.IMAGE_URL} width={763} height={400} layout='responsive'/>
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
        </>
    );
}

// <div style="position: relative; display: block; max-width: 100%;">
//     <div style="padding-top: 56.25%;">
//         <iframe src="https://players.brightcove.net/5194481742001/S1peRoq6g_default/index.html?videoId=6135824949001"
//                 allowFullScreen="" allow="encrypted-media"
//                 style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; width: 100%; height: 100%;"></iframe>
//     </div>
// </div>

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
    const pageId = context.params.id;
    let pageProps = {};

    await fetch(`https://api.frc.org/api/webtext/${pageId}.json?trackDownload=0`)
        .then(res => res.json())
        .then(
            (result) => {
                pageProps = result.pop();
                pageProps.iframeHtml = {
                    __html: pageProps.IFRAME
                }
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

    return {
        props: {...pageProps},
        revalidate: 60
    };
}

export default Post;