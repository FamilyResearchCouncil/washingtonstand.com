import HeadTag from "../../../components/layout/HeadTag";
import Image from "next/image";
import React, {useState} from "react"
import {StyledContentContainer} from "../../../components/layout/sections/contentContainer"
import {useAPIStaff} from "../../../contexts/AuthorListContext"
import GetPublications from "../../../helpers/GetPublications"
import GetAuthorsDetails from "../../../helpers/GetAuthorsDetails";


const Bio = (props) => {

    // const { staff, isLoading } = useAPIStaff();
    // const [staffData,setStaffData] = useState({});
    // const [pageLoaded,setpageLoaded] = useState(false);
    // const thisStaff = staff.filter(staff => staff.AUTHOR_SLUG == props.id).pop();
    //
    // if (!isLoading) {
    //     fetch(`https://api.frc.org/api/webtext/${thisStaff.BIO_ITEM}.cfm`)
    //         .then(res => res.text())
    //         .then(
    //             (result) => {
    //                 console.log(result);
    //                 thisStaff.displayHtml = {
    //                     __html: `${result}`
    //                 }
    //                 setStaffData(thisStaff);
    //                 setpageLoaded(true);
    //             },
    //             // Note: it's important to handle errors here
    //             // instead of a catch() block so that we don't swallow
    //             // exceptions from actual bugs in components.
    //             (error) => {
    //                 console.log(error);
    //                 // setIsLoaded(true);
    //                 // setError(error.message);
    //             }
    //         );
    // }

    return (
        <>
            <StyledContentContainer>
                {/*{JSON.stringify(props)}*/}
                <HeadTag title={props.AUTHOR_NAME} description="" />
                <Image src={props.AUTHOR_IMG} width={150} height={150} />
                <h1>{props.AUTHOR_NAME}</h1>
                <h2>{props.AUTHOR_TITLE}</h2>
                {/*<div dangerouslySetInnerHTML={staffData.displayHtml} />*/}
                <center>
                    <Image src="/img/Flame_icon.svg" height={50} width={50} />
                </center>
            </StyledContentContainer>
            {/*{pageLoaded ?*/}
            {/*    <StyledContentContainer>*/}
            {/*        {JSON.stringify(props)}*/}
            {/*        /!*<HeadTag title={staffData.AUTHOR_NAME} description="" />*!/*/}
            {/*        /!*<Image src={staffData.AUTHOR_IMG} width={150} height={150} />*!/*/}
            {/*        /!*<h1>{staffData.AUTHOR_NAME}</h1>*!/*/}
            {/*        /!*<h2>{staffData.AUTHOR_TITLE}</h2>*!/*/}
            {/*        /!*<div dangerouslySetInnerHTML={staffData.displayHtml} />*!/*/}
            {/*        /!*<center>*!/*/}
            {/*        /!*    <Image src="/img/Flame_icon.svg" height={50} width={50} />*!/*/}
            {/*        /!*</center>*!/*/}
            {/*    </StyledContentContainer>*/}
            {/*    :*/}
            {/*    <p>Loading...</p>*/}
            {/*}*/}
        </>
    )
};

export async function getStaticPaths() {

    const publications = await GetPublications();
    const authors = await GetAuthorsDetails();

    let authorIdArray = [];

    publications.forEach(pub => {
        pub.AUTHOR_ID_LIST.split(',').forEach(authorId => {
            if (!authorIdArray.includes(authorId) && authorId) authorIdArray.push(authorId);
        });
    } );

    let authorPathArray = authorIdArray.map((authorId,idx) => {

        let author =  authors.find(details => details.PERSONAL_ID === authorId);
            return (typeof author !== "undefined") ? {params: { id: author.AUTHOR_SLUG}} : false;
    });

    authorPathArray = authorPathArray.filter(author => author);

    console.log(authorPathArray);
    return {
        paths: authorPathArray,
        fallback: "blocking"
    };
}


export async function getStaticProps(context) {
    const pageId = context.params.id;
    const authors = await GetAuthorsDetails();

    let pageProps = authors.filter(author => author.AUTHOR_SLUG === pageId).pop();

    return {
        props: {...pageProps},
        revalidate: 10
    };
}

export default Bio;