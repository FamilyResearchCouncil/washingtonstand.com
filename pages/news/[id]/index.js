import React, { useEffect, useState } from "react";
import HeadTag from "../../../components/layout/HeadTag";
import Image from "next/image";
import {StyledContentContainer} from "../../../components/layout/sections/contentContainer";
import {StyledReadingSection} from "../../../components/subComponents/readingTextBlock";
import DisplayByLine from "../../../components/subComponents/DisplayByLine";

const Post = (props) => {
    return (
        <>
            {/*{JSON.stringify(props)}*/}
            <HeadTag title={props.ITEM_DESC} description={props.SUMMARY_TEXT}/>
            <StyledContentContainer>
                <article>
                <Image src={props.IMAGE_URL} width={763} height={400} layout='responsive'/>
                <h1>{props.ITEM_DESC}</h1>
                <DisplayByLine personalIdArray={props.authourArray} DISPLAY_MEDIA_DATE={props.DISPLAY_MEDIA_DATE}/>
                <StyledReadingSection>
                    <div dangerouslySetInnerHTML={props.displayHtml} />
                </StyledReadingSection>
                <center>
                    <Image src="/img/Flame_icon.svg" height={50} width={50}/>
                </center>
                </article>
            </StyledContentContainer>
        </>
    );
}

export async function getStaticPaths() {


    const response =  await fetch(`https://api.frc.org/api/webjson/frc/script-generated/item_listing_NA.json`);
    const publications = await response.json();

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

    await fetch(`https://api.frc.org/api/webtext/${pageId}.json`)
        .then(res => res.json())
        .then(
            (result) => {
                pageProps = result.pop();
            },
            (error) => {
                // console.log(error);

            }
        );

    await fetch(`https://api.frc.org/api/webtext/${pageId}.cfm`)
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
        revalidate: 10
    };
}

export default Post;