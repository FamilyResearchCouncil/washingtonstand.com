import React, { useEffect, useState } from "react";
import HeadTag from "../../../components/layout/HeadTag";
import Image from "next/image";
import {StyledContentContainer} from "../../../components/layout/sections/contentContainer";
import DisplayPublicationHtml from "../../../components/subComponents/DisplayPublicationHtml";
import {useAPIStaff} from "../../../contexts/AuthorListContext";
import {StyledReadingSection} from "../../../components/subComponents/readingTextBlock";

const DisplayAuthors = (props) => {
    const { staff, isLoading } = useAPIStaff();
    const [ pubAuthors, setPubAuthors ] = useState([]);

    useEffect(() => {
        if (!isLoading) {
            setPubAuthors(staff.filter(author => props.personalIdArray.includes(author.PERSONAL_ID)));
            // console.log(pubAuthors);
        }
    }, [pubAuthors]);

    if (!isLoading) {

        // console.log(staff.filter(author => props.personalIdArray.includes(author.PERSONAL_ID)));
        // setPubAuthors(staff.filter(author => props.personalIdArray.includes(author.PERSONAL_ID)))
        return (
            <>
                {
                    pubAuthors.map(author => (
                        <div>
                            {JSON.stringify(author)}
                        </div>

                    ))
                }
            </>
        );
    } else {
        return (
            <>
               Loading...
            </>
        );
    }
};

const Post = (props) => {
    console.log(props);
    return (
        <>
            <HeadTag title={props.pageProps.ITEM_DESC} description={props.pageProps.SUMMARY_TEXT}/>
            {/*{JSON.stringify(props)}*/}
            <StyledContentContainer>
                <Image src={props.pageProps.IMAGE_URL} width={763} height={400} layout='responsive'/>
                <h1>{props.pageProps.ITEM_DESC}</h1>
                <DisplayAuthors personalIdArray={props.pageProps.authourArray}/>
                <DisplayPublicationHtml item_code={props.pageProps.ITEM_CODE}/>
                <center>
                    <Image src="/img/Flame_icon.svg" height={50} width={50}/>
                </center>
            </StyledContentContainer>
        </>
    );
}

// Post.getInitialProps = async ({query}) => {
//
//     let pageProps = {};
//
//     await fetch(`https://api.frc.org/api/webtext/${query.id}.json`)
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
//                 console.log(error);
//
//             }
//         );
//
//     pageProps.authourArray = pageProps.AUTHOR_ID_LIST.split(',');
//
//     return pageProps;
// }

export async function getServerSideProps(context) {
    // console.log(context.query);
    const pageId = context.query.id;
    let pageProps = {};

    // console.log(pageId);

    await fetch(`https://api.frc.org/api/webtext/${pageId}.json`)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                pageProps = result.pop();
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                // console.log(error);

            }
        );

    pageProps.authourArray = pageProps.AUTHOR_ID_LIST.split(',');

    return { props: { pageProps } };
}

export default Post;