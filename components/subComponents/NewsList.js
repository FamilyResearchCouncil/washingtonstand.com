import React, { useEffect, useState } from "react";
import Link from "next/link";
import appUrls from "../../storage/baseUrls.json";
import {useAPIPubs} from "../../contexts/PublicationListContext";
import Image from "next/image";

const NewsItem = (props) => (
    <>
        <div>
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
        </div>
    </>
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
