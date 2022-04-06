import React, { useEffect, useState } from "react";
import Link from "next/link";
import appUrls from "../../storage/baseUrls.json";
import {useAPIPubs} from "../../contexts/PublicationListContext";

const NewsItem = (props) => (
    <>
        <div>
            <Link href={`/${appUrls.urlDirectories.news}/${props.itemCode}`}>
                <a>
                <strong>{props.title}</strong>
                </a>
            </Link>
            <p>{props.summary}</p>
        </div>
    </>
);

const NewsListing = () => {

    const { publications, isLoading } = useAPIPubs();
    return (<>
        {!isLoading ?
            publications.map(item => (
                <NewsItem title={item.ITEM_DESC} summary={item.SUMMARY_TEXT} itemCode={item.ITEM_CODE}/>
            ))
            :
            <p>Loading...</p>
        }

    </>);
}

export default NewsListing;
