import HeadTag from "../../components/layout/HeadTag";
import styled from "styled-components";
import {StyledContentContainer} from "../../components/layout/sections/contentContainer";
import DisplayPublicationHtml from "../../components/subComponents/DisplayPublicationHtml";
import {PageToFooterSpacing} from "../../components/subComponents/PageToFooterSpacing";
import React from "react";


const StaffGrid = styled.div`
  max-width: 900px;
  margin: 0 auto;
  
  ul {
    display: grid;
    grid-column-gap: 2rem;
    grid-row-gap: 4rem;
    list-style: none;
    text-align: center;
    padding: 0;
    margin-bottom: 8rem;
    
    a {
      display: block;
      margin-bottom: 1.5rem;
    }
    
    h3 {
      font-size: 1.6rem;
      margin: 0;
    }
    
    h4 {
      font-weight: 400;
      font-size: 1.4rem;
      margin: 0;
    }
    
    img {
      max-width: 100%;
      border-radius: 50%;
      border: solid 3px ${({theme}) => theme.colors.primaryBlue};
    }
    
    &.editorsList {
      grid-template-columns: repeat(2,1fr);
    }
    &.writersList {
      grid-template-columns: repeat(2,1fr);
    }

    @media (min-width: ${({ theme }) => theme.breakPoints.medium}) {
      &.editorsList {
        grid-template-columns: repeat(4,1fr);
      }
      &.writersList {
        grid-template-columns: repeat(4,1fr);
      }
    }
    
  }

  @media (min-width: ${({ theme }) => theme.breakPoints.medium}) {
    grid-template-columns: repeat(4,1fr);
  }
  
  .staffDisplay {
    display: grid;
    grid-gap: 1rem;
    align-content: center;
    text-align: center;
    img {
      max-width: 110px;
    }
  }
`

const TitleH2 = styled.h2`
  font-family: ${({theme}) => theme.fonts.titleText};
  font-size: 4rem;
  font-weight: 700;
  margin: 0 0 4rem;
  text-align: center;
  
  span {
    border-bottom: solid 3px ${({theme}) => theme.colors.primaryYellow};
  }

  @media (min-width: ${({ theme }) => theme.breakPoints.medium}) {
    font-size: 5.5rem;
  }
`
// facebook & twitter & email
const StaffPage = (props) => (
    <>
        <HeadTag title="Washington Stand Authors" description="" />
        <h1 style={{ fontSize: '0px', display: "none" }}>The Washington Stand Authors</h1>
        <StyledContentContainer>
            <TitleH2><span>Staff</span></TitleH2>
            <StaffGrid>
                <DisplayPublicationHtml className={`textWrapper`} displayHtml={props.staffAuthorHtml}/>
            </StaffGrid>
            <TitleH2><span>Contributors</span></TitleH2>
            <StaffGrid>
                <DisplayPublicationHtml className={`textWrapper`} displayHtml={props.contributorAuthorHtml}/>
            </StaffGrid>
        </StyledContentContainer>
        <PageToFooterSpacing />
    </>
);


export async function getStaticProps() {

    let pageProps = {}

    await fetch(`https://apiv2.frc.org/api/webtext/WX22E14.cfm?trackDownload=0`)
        .then(res => {
            return (res.ok) ? res.text() : Promise.resolve("");
        })
        .then(
            (result) => {
                pageProps.staffAuthorHtml = {
                    __html: result
                };
            },
            (error) => {

            }
        );

    await fetch(`https://apiv2.frc.org/api/webtext/WX22E18.cfm?trackDownload=0`)
        .then(res => {
            return (res.ok) ? res.text() : Promise.resolve("");
        })
        .then(
            (result) => {
                pageProps.contributorAuthorHtml = {
                    __html: result
                };
            },
            (error) => {

            }
        );

    return {
        props: {...pageProps},
        revalidate: 60
    };

}

export default StaffPage;
