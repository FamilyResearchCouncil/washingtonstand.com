import styled from "styled-components";
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton
} from "react-share";


export const SocialDiv = styled.div`
  margin: 1.5rem 0;
  button {
    margin-right: .5rem;
  }
`;


const SocialSharing = (props) => (
    <SocialDiv>
        <FacebookShareButton children={<FacebookIcon  borderRadius={8} size={40} />} url={props.CANONICAL_URL} quote={props.ITEM_DESC} hashtag={props.TAG_LIST.split(",")}/>
        <TwitterShareButton children={<TwitterIcon  borderRadius={8} size={40} />} url={props.CANONICAL_URL} title={props.ITEM_DESC} hashtag={props.TAG_LIST.split(",")}/>
        <EmailShareButton children={<EmailIcon  borderRadius={8} size={40} />} url={props.CANONICAL_URL} subject={props.ITEM_DESC} body={`Hey! I thought you'd like this article from The Washington Stand.`}/>
    </SocialDiv>
);

export default SocialSharing;