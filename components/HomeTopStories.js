import Link from "next/link";
import appUrls from "../storage/baseUrls.json";
import Image from "next/image";
import styled from "styled-components";

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
        font-size: 1.8rem;
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
                <TopItemLink key={idx} ITEM_DESC={item.ITEM_DESC} ITEM_CODE={item.ITEM_CODE} SCREENCAP_IMAGE={item.SCREENCAP_IMAGE}/>
            ))
        }
        </ListGrid>
    </>
);

const TopItemLink = (props) => (
    <>
        <article>
        <Link href={`${appUrls.urlDirectories.news}/${props.ITEM_CODE}`}>
            <a>
                <Image src={props.SCREENCAP_IMAGE} width={763} height={400} layout='responsive'/>
            </a>
        </Link>
        <Link href={`${appUrls.urlDirectories.news}/${props.ITEM_CODE}`}>
            <a>
                <h3 dangerouslySetInnerHTML={{__html: props.ITEM_DESC}} />
            </a>
        </Link>
        </article>
    </>
);

export default TopItemsList;