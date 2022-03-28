import React, { useEffect, useState } from "react";


const NewsItem = (props) => (
    <>
        <div>
            <strong>{props.title}</strong>
            <p>{props.summary}</p>
        </div>
    </>
);

const NewsListing = () => {

    let [error, setError] = useState(null);
    let [isLoaded, setIsLoaded] = useState(false);
    let [items, setItems] = useState([]);

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        // fetch("https://frc.org/webjson/frc/script_generated/item_listing_NA.json")
        fetch("https://api.frc.org/api/webjson/frc/script-generated/item_listing_NA.json")
        // fetch("/test-json/item_listing_NA.json")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setIsLoaded(true);
                    setItems(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error.message);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error}</div>;
    } else if (!isLoaded || items.length === 0) {
        return <div>Loading...</div>;
    } else {
        return (
            items.map(item => (
                <NewsItem title={item.ITEM_DESC} summary={item.SUMMARY_TEXT}/>
            ))
        );
    }
}

export default NewsListing;
