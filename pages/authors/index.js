import HeadTag from "../../components/layout/HeadTag";
import styled from "styled-components";
import {StyledContentContainer} from "../../components/layout/sections/contentContainer";
import DisplayPublicationHtml from "../../components/subComponents/DisplayPublicationHtml";


const StaffGrid = styled.div`
  display: grid;
  grid-gap: 6rem;
  grid-template-columns: repeat(2,1fr);
  max-width: 900px;
  margin: 0 auto;

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

const StaffPage = (props) => (
    <>
        <HeadTag title="Washington Stand Authors" description="" />
        <StyledContentContainer>
            <StaffGrid>
                <DisplayPublicationHtml className={`textWrapper`} displayHtml={props.staffAuthorHtml}/>
            </StaffGrid>
        </StyledContentContainer>
    </>
);


export async function getStaticProps() {

    let pageProps = {}

    await fetch(`https://api.frc.org/api/webtext/WX22E14.cfm?trackDownload=0`)
        .then(res => res.text())
        .then(
            (result) => {
                pageProps.staffAuthorHtml = {
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
