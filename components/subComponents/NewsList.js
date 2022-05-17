import React, { useEffect, useState } from "react";
import Link from "next/link";
import appUrls from "../../storage/baseUrls.json";
import {useAPIPubs} from "../../contexts/PublicationListContext";
import Image from "next/image";
import styled from "styled-components";
import {concatAuthorNames} from "../../helpers/DataManipulators";

const ArticleLink = styled.article`
  h2, h3 {
    font-family: ${({theme}) => theme.fonts.titleText };
    font-size: 2rem;
    margin-top: 0;
  }
  &:last-child {
    border-bottom: none;
  }
`
//authorDetailsArray

const NewsItem = (props) => (
    <ArticleLink>
        {

            props.displayImg ?
            <Link href={`${appUrls.urlDirectories.news}/${props.article.ITEM_CODE}`}>
                <a>
                    <Image src={props.article.SCREENCAP_IMAGE} width={763} height={400} layout='responsive'/>
                </a>
            </Link> : ""
        }
        <div>
            <Link href={`${appUrls.urlDirectories.news}/${props.article.ITEM_CODE}`}>
                <a>
                    <h2 dangerouslySetInnerHTML={{__html: props.article.ITEM_DESC}} />
                </a>
            </Link>
            {
                props.displayByLine ?
                    <span>
                        <i>{props.article.FULL_DATE}</i> &nbsp;|&nbsp; {concatAuthorNames(props.article.authorDetailsArray)}
                    </span>
                    : <></>
            }
        </div>
    </ArticleLink>
);

const NewsListing = (props) => {
    const { publications, isLoading } = useAPIPubs();
    if(props.list) {
        return (<>
            {
                props.list.map((item,idx) => (
                    <NewsItem
                        key={idx}
                        displayImg={props.displayImg}
                        displaySummary={props.displaySummary}
                        displayByLine={props.displayByLine}
                        article={item}
                    />
                ))
            }
        </>);
    } else {
        return (<>
            {!isLoading ?
                publications.map((item,idx) => (
                    <NewsItem
                        key={idx}
                        displayImg={props.displayImg}
                        displaySummary={props.displaySummary}
                        displayByLine={props.displayByLine}
                        article={item}
                    />
                ))
                :
                <p>Loading...</p>
            }
        </>);
    }
}

export default NewsListing;
