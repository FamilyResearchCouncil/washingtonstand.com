import Link from "next/link";
import appUrls from "../storage/baseUrls.json";
import Image from "next/image";
import styled from "styled-components";

const FeatureTitle = styled.h3`
  font-family: ${({theme}) => theme.fonts.titleText};
  font-size: 4rem;
  font-weight: 400;
  margin: 1rem 0rem;
`;

const FeaturedPublication = (props) => (
    <article>
        <Link href={`${appUrls.urlDirectories.news}/${props.ITEM_CODE}`}>
            <a>
                <Image src={props.SCREENCAP_IMAGE} width={763} height={400} layout='responsive'/>
            </a>
        </Link>
        <Link href={`${appUrls.urlDirectories.news}/${props.ITEM_CODE}`}>
            <a>
                <FeatureTitle>{props.ITEM_DESC}</FeatureTitle>
            </a>
        </Link>
        <p>{props.SUMMARY_TEXT}</p>
    </article>
);

export default FeaturedPublication;