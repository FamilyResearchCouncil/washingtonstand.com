import HeadTag from "../components/layout/HeadTag"
import {StyledReadingSection} from "../components/subComponents/ReadingTextBlock";
import DisplayPublicationHtml from "../components/subComponents/DisplayPublicationHtml";
import FlameImage from "../components/subComponents/FlameImage";
import styled from "styled-components";
import {PageToFooterSpacing} from "../components/subComponents/PageToFooterSpacing";
import GetAboutText from "../helpers/GetAboutText";


const TitleH1 = styled.h1`
  font-family: ${({theme}) => theme.fonts.titleText};
  font-size: 4rem;
  font-weight: 400;
  margin: 0 0 4rem;
  
  span {
    border-bottom: solid 3px ${({theme}) => theme.colors.primaryBlue};
  }

  @media (min-width: ${({ theme }) => theme.breakPoints.medium}) {
    font-size: 5.5rem;
  }
`


const AboutUs = (props) => (
    <>
        <HeadTag title="About Us" description="About The Washington Stand" />
        <StyledReadingSection>
            <TitleH1><span>ABOUT</span></TitleH1>
            <DisplayPublicationHtml displayHtml={props.displayHtml}/>
            <FlameImage />
        </StyledReadingSection>
        <PageToFooterSpacing />
    </>
);


export async function getStaticProps() {

    let pageProps = {}

    pageProps.displayHtml = await GetAboutText();

    return {
        props: {...pageProps},
        revalidate: 60
    };

}



export default AboutUs;