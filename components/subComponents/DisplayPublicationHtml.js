import styled from "styled-components";

const HtmlWrapper = styled.div`
  a {
    color: ${({theme}) => theme.colors.primaryBlue}
  }
  a:hover {
    color: ${({theme}) => theme.colors.primaryYellow}
  }
  img {
    max-width: 100% !important;
    height: auto !important;
  }
  iframe {
    max-width: 100%;
    display: block;
  }
`;

const DisplayPublicationHtml = (props) => (
    <>
        <HtmlWrapper>
            <div dangerouslySetInnerHTML={props.displayHtml} />
        </HtmlWrapper>
    </>
)


export default DisplayPublicationHtml;
