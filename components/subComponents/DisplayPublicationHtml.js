import styled from "styled-components";

const HtmlWrapper = styled.div`
  a {
    color: ${({theme}) => theme.colors.primaryYellow}
  }
  a:hover {
    color: ${({theme}) => theme.colors.primaryBlue}
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
