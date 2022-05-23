import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const FeatureTitle = styled.h3`
  font-family: ${({theme}) => theme.fonts.titleText};
  font-size: 4rem;
  font-weight: 700;
  margin: 1rem 0rem;

  @media (min-width: ${({ theme }) => theme.breakPoints.medium}) {
    font-size: 5.5rem;
  }
`;

const FeaturedPublication = (props) => (
    <article>
        <Link href={`/${props.TYPE_DESC.toLowerCase()}/${props.ITEM_CODE}`}>
            <a>
                <Image src={props.SCREENCAP_IMAGE} width={763} height={400} layout='responsive'/>
            </a>
        </Link>
        <Link href={`/${props.TYPE_DESC.toLowerCase()}/${props.ITEM_CODE}`}>
            <a>
                <FeatureTitle dangerouslySetInnerHTML={{__html: props.ITEM_DESC}} />
            </a>
        </Link>
        <p>{props.SUMMARY_TEXT}</p>
    </article>
);

export default FeaturedPublication;