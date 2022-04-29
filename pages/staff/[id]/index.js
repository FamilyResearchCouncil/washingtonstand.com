import HeadTag from "../../../components/layout/HeadTag";
import Image from "next/image";
import React, {useState} from "react"
import {StyledGreySection} from "../../../components/layout/sections/GeySection";
import {StyledReadingSection} from "../../../components/subComponents/readingTextBlock";
import {StyledContentContainer} from "../../../components/layout/sections/contentContainer";
import GetPublications from "../../../helpers/GetPublications"
import GetAuthorsDetails from "../../../helpers/GetAuthorsDetails";
import styled from "styled-components";
import PaginatedItems from "../../../components/subComponents/PaginatedList";

const BioGridSection = styled.div`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: 200px 1fr;
  align-items: center;
`;

const BioListingGrid = styled.div`
  margin-top: 6rem;
  display: grid;
  display: grid;
  align-items: center;
  
  article {
    padding-bottom: 2rem;
    margin-bottom: 2rem;
    border-bottom: solid 2px ${({theme}) => theme.colors.primaryGrey};
  }
  
  article {
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: 1fr 2fr;
    align-items: baseline;
    align-content: center;
    
    h2 {
      margin: 0px;
    }
  }
  
`;


const Bio = (props) => {

    return (
        <>
            <HeadTag title={props.AUTHOR_NAME} description="" />
            <StyledGreySection>
                <StyledContentContainer>
                    <BioGridSection>
                    <Image src={props.AUTHOR_IMG} width={400} height={400} />
                    <div>
                        <h1>{props.AUTHOR_NAME}</h1>
                        {/*<h2>{props.AUTHOR_TITLE}</h2>*/}
                        {/*{JSON.stringify(props.displayHtml)}*/}
                        <div dangerouslySetInnerHTML={props.displayHtml} />
                    </div>
                    </BioGridSection>
                </StyledContentContainer>
            </StyledGreySection>

            <StyledReadingSection>
                <BioListingGrid>
                    <PaginatedItems itemsPerPage={6} itemList={props.authorPublications} columnClass={``} displayByLine={true}/>
                {/*<NewsList displayImg={true} list={props.authorPublications}/>*/}
                </BioListingGrid>
            </StyledReadingSection>

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

    return {
        paths: authorPathArray,
        fallback: "blocking"
    };
}


export async function getStaticProps(context) {
    const pageId = context.params.id;
    const authors = await GetAuthorsDetails();
    const publications = await GetPublications();

    let pageProps = authors.filter(author => author.AUTHOR_SLUG === pageId).pop();

    await fetch(`https://api.frc.org/api/webtext/${pageProps.BIO_ITEM}.json?trackDownload=0`)
        .then(res => res.json())
        .then(
            (result) => {
                pageProps.displayHtml = {
                    __html: (result.length) ? result.pop().SHORT_BIO : ""
                }
            },
            (error) => {

            }
        );

    pageProps.authorPublications = publications.filter(pub => pub.AUTHOR_ID_LIST.includes(pageProps.PERSONAL_ID));

    return {
        props: {...pageProps},
        revalidate: 60
    };
}

export default Bio;