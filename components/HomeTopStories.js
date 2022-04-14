import Link from "next/link";
import appUrls from "../storage/baseUrls.json";
import Image from "next/image";
import styled from "styled-components";

const ListGrid = styled.div`
  display: grid;
  grid-gap: 2rem;

  h3 {
    margin-top: 0;
    font-size: 1.4rem;
  }
  
  article {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
  }
`

const TopItemsList = (props) => (
    <>
        <ListGrid>
        {
            props.list.map(item => (
                <TopItemLink ITEM_DESC={item.ITEM_DESC} ITEM_CODE={item.ITEM_CODE} SCREENCAP_IMAGE={item.SCREENCAP_IMAGE}/>
            ))
        }
        </ListGrid>
    </>
);

const TopItemLink = (props) => (
    <>
        <article>
        <Link href={`/${appUrls.urlDirectories.news}/${props.ITEM_CODE}`}>
            <a>
                <Image src={props.SCREENCAP_IMAGE} width={763} height={400} layout='responsive'/>
            </a>
        </Link>
        <Link href={`/${appUrls.urlDirectories.news}/${props.ITEM_CODE}`}>
            <a>
                <h3>{props.ITEM_DESC}</h3>
            </a>
        </Link>
        </article>
    </>
);

export default TopItemsList;