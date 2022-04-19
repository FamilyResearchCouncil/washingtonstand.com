import React, { useEffect, useState } from "react";
import HeadTag from "../../../components/layout/HeadTag";
import Image from "next/image";
import {StyledContentContainer} from "../../../components/layout/sections/contentContainer";
import {useAPIStaff} from "../../../contexts/AuthorListContext";
import {StyledReadingSection} from "../../../components/subComponents/readingTextBlock";


const DisplayAuthImages = (props) => (
    <div>
        {
            props.authors.map(author => (
                <Image src={author.AUTHOR_IMG} width={100} height={100}/>
            ))
        }
    </div>
);

const DisplayAuthNames = (props) => (
    <div>
        {
            props.authors.map((author,idx) => {

                let spacerString = (idx == props.authors.length-1) ? "" : ", ";

                return (
                <span>{author.AUTHOR_NAME}{spacerString}</span>
            )})
        }
    </div>
);

const DisplayByLine = (props) => {
    const { staff, isLoading } = useAPIStaff();
    const [ pubAuthors, setPubAuthors ] = useState([]);

    useEffect(() => {
        if (!isLoading) {
            setPubAuthors(staff.filter(author => props.personalIdArray.includes(author.PERSONAL_ID)));
            // console.log(pubAuthors);
        }
    }, []);

    if (!isLoading) {

        // console.log(staff.filter(author => props.personalIdArray.includes(author.PERSONAL_ID)));
        // setPubAuthors(staff.filter(author => props.personalIdArray.includes(author.PERSONAL_ID)))
        return (
            <>
                <DisplayAuthImages authors={pubAuthors}/>
                <DisplayAuthNames authors={pubAuthors}/>
                <span>{props.DISPLAY_MEDIA_DATE}</span>
                {/*{*/}
                {/*    pubAuthors.map(author => (*/}
                {/*        <div>*/}
                {/*            {JSON.stringify(author)}*/}
                {/*            <br />*/}
                {/*            <div>*/}
                {/*            <DisplayAuthImages authors={}/>*/}
                {/*            <span>{author.AUTHOR_NAME}</span>*/}
                {/*            </div>*/}
                {/*        </div>*/}

                {/*    ))*/}
                {/*}*/}
            </>
        );
    } else {
        return (
            <>

            </>
        );
    }
};

//DISPLAY_MEDIA_DATE

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