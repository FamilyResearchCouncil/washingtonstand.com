import React, { useEffect, useState } from "react";
import Link from "next/link";
import appUrls from "../../storage/baseUrls.json";
import {useAPIPubs} from "../../contexts/PublicationListContext";
import Image from "next/image";

const NewsItem = (props) => (
    <>
        <div>
            <Link href={`/${appUrls.urlDirectories.news}/${props.itemCode}`}>
                <a>
                    <Image src={props.imgUrl} width={763} height={400} layout='responsive'/>
                    <h2>{props.title}</h2>
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
                <NewsItem title={item.ITEM_DESC} summary={item.SUMMARY_TEXT} itemCode={item.ITEM_CODE} imgUrl={item.SCREENCAP_IMAGE}/>
            ))
            :
            <p>Loading...</p>
        }

    </>);
}

export default NewsListing;
