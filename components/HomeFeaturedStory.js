import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import {PublicationTypeGreyText} from "./subComponents/PublicationTypeGreyText";

const FeatureTitle = styled.h3`
  font-family: ${({theme}) => theme.fonts.titleText};
  font-size: 4rem;
  font-weight: 700;
  margin: 0;
  margin-top: -1rem;

  @media (min-width: ${({ theme }) => theme.breakPoints.medium}) {
    font-size: 5.5rem;
  }
`;

const leadStoryTypeStyle = {
    display: "block",
    marginTop: "2rem"
}

const FeaturedPublication = (props) => (
    <article>
        <Link href={`/${props.TYPE_DESC.toLowerCase()}/${props.URL_SLUG}`}>
            <a>
                <Image src={props.SCREENCAP_IMAGE} width={763} height={400} layout='responsive'/>
            </a>
        </Link>
        <div>
            <PublicationTypeGreyText style={leadStoryTypeStyle}>{props.TYPE_DESC}</PublicationTypeGreyText>
            <Link href={`/${props.TYPE_DESC.toLowerCase()}/${props.URL_SLUG}`}>
                <a>
                    <FeatureTitle dangerouslySetInnerHTML={{__html: props.ITEM_DESC}} />
                </a>
            </Link>
        </div>
        <p>{props.SUMMARY_TEXT}</p>
    </article>
);

export default FeaturedPublication;