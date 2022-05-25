import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import {PublicationTypeGreyText} from "./subComponents/PublicationTypeGreyText";

const ListGrid = styled.div`
  display: grid;

  h3 {
    margin-top: 0;
    font-size: 1.8rem;
    font-family: ${({theme}) => theme.fonts.titleText };
  }
  
  article {
    display: grid;
    grid-template-columns: .7fr 1.3fr;
    grid-gap: 1.5rem;
    padding: 2rem 0;
    border-bottom: solid 2px ${({theme}) => theme.colors.primaryGrey};

    h3 {
      font-size: 1.6rem;
    }
    
    &:first-child {
      padding-top: 0;
    }
    
    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    @media (min-width: ${({ theme }) => theme.breakPoints.small}) {
      h3 {
        font-size: 2rem;
      }
    }
    
  }

  @media (min-width: ${({ theme }) => theme.breakPoints.large}) {
    article {
      grid-template-columns: 1.2fr .8fr;
    }
  }
  @media (min-width: ${({ theme }) => theme.breakPoints.xLarge }) {
    article {
      grid-template-columns: .8fr 1.2fr;
    }
  }
`

const TopItemsList = (props) => (
    <>
        <ListGrid>
        {
            props.list.map((item,idx) => (
                <TopItemLink key={idx} {...item} />
            ))
        }
        </ListGrid>
    </>
);

const TopItemLink = (props) => (
    <article key={props.ITEM_CODE}>
        <Link href={`/${props.TYPE_DESC.toLowerCase()}/${props.URL_SLUG}`}>
            <a>
                <Image src={props.SCREENCAP_IMAGE} width={763} height={400} layout='responsive'/>
            </a>
        </Link>
        <div>
            <PublicationTypeGreyText>{props.TYPE_DESC}</PublicationTypeGreyText>
            <Link href={`/${props.TYPE_DESC.toLowerCase()}/${props.URL_SLUG}`}>
                <a>
                    <h3 dangerouslySetInnerHTML={{__html: props.ITEM_DESC}} />
                </a>
            </Link>
        </div>
    </article>
);

export default TopItemsList;