import React, { useEffect, useState } from "react";
import HeadTag from "../../../components/layout/HeadTag";
import Image from "next/image";
import {StyledContentContainer} from "../../../components/layout/sections/contentContainer";
import {useAPIStaff} from "../../../contexts/AuthorListContext";
import {StyledReadingSection} from "../../../components/subComponents/readingTextBlock";




const Topics = (props) => {
    return (
        <>
            <HeadTag title={props.title} description={props.title}/>
            <StyledContentContainer>
                <h1>{props.title}</h1>
                {
                    props.publicationList.map(item => (
                        <div>
                            <Image src={item.SCREENCAP_IMAGE} width={763} height={400} layout='responsive'/>
                            <h2>{item.ITEM_DESC}</h2>
                            <p>{item.SUMMARY_TEXT}</p>
                        </div>
                    ))
                }
            </StyledContentContainer>
        </>
    );
}

const formatDisplayTopic = (topicSlug) => {
    let wordArray = topicSlug.split("-").map(word => word.toUpperCase());
    return wordArray.join(" ");
}

Topics.getInitialProps = async ({query}) => {

    let pageProps = {};

    // await fetch(`https://api.frc.org/api/webtext/${query.id}.json`)
    await fetch(`https://api.frc.org/api/webjson/frc/script-generated/tag_listing_${query.id}.json`)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                pageProps.publicationList = result;
                pageProps.title = formatDisplayTopic(query.id);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log(error);

            }
        );

    return pageProps;
}

//
// export async function getServerSideProps(context) {
//     // console.log(context.query);
//     const pageId = context.query.id;
//     let pageProps = {};
//
//     // console.log(pageId);
//
//     await fetch(`https://api.frc.org/api/webtext/${pageId}.json`)
//         .then(res => res.json())
//         .then(
//             (result) => {
//                 console.log(result);
//                 pageProps = result.pop();
//             },
//             // Note: it's important to handle errors here
//             // instead of a catch() block so that we don't swallow
//             // exceptions from actual bugs in components.
//             (error) => {
//                 // console.log(error);
//
//             }
//         );
//
//     pageProps.authourArray = pageProps.AUTHOR_ID_LIST.split(',');
//
//     return { props: { pageProps } };
// }

export default Topics;