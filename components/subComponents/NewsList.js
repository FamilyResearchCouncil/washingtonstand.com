import React, { useEffect, useState } from "react";
import Link from "next/link";
import appUrls from "../../storage/baseUrls.json";
import {useAPIPubs} from "../../contexts/PublicationListContext";
import Image from "next/image";
import styled from "styled-components";

const ArticleLink = styled.article`
  h2, h3 {
    font-family: ${({theme}) => theme.fonts.titleText };
  }
`

const NewsItem = (props) => (
    <ArticleLink>
        <Link href={`${appUrls.urlDirectories.news}/${props.itemCode}`}>
            <a>
                {

                    props.displayImg ? <Image src={props.imgUrl} width={763} height={400} layout='responsive'/> : ""
                }
                <h2>{props.title}</h2>
            </a>
        </Link>
        {
            props.summaryInclude ? <p>{props.summary}</p> : <></>
        }
    </ArticleLink>
);

const NewsListing = (props) => {
    const { publications, isLoading } = useAPIPubs();
    if(props.list) {
        return (<>
            {
                props.list.map((item,idx) => (
                    <NewsItem key={idx} displayImg={props.displayImg}  title={item.ITEM_DESC} summary={item.SUMMARY_TEXT} itemCode={item.ITEM_CODE}
                              imgUrl={item.SCREENCAP_IMAGE} summaryInclude={props.summaryInclude}/>
                ))
            }
        </>);
    } else {
        return (<>
            {!isLoading ?
                publications.map((item,idx) => (
                    <NewsItem key={idx} displayImg={props.displayImg}  title={item.ITEM_DESC} summary={item.SUMMARY_TEXT} itemCode={item.ITEM_CODE} imgUrl={item.SCREENCAP_IMAGE} summaryInclude={props.summaryInclude}/>
                ))
                :
                <p>Loading...</p>
            }
        </>);
    }
}

export default NewsListing;
