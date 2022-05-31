import React, { useState, useRef, useEffect } from "react";
import {StyledReadingSection} from "./ReadingTextBlock";


const TopTopics = () => {
    const [error, setError] = useState(null);
    const [displayHtml, setDisplayHtml] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() =>{
        fetch(`https://api.frc.org/api/webtext/WX22D07.cfm?trackDownload=0`)
            .then(res => {
                return (res.ok) ? res.text() : Promise.resolve("");
            })
            .then(
                (result) => {
                    setDisplayHtml({
                        __html: result.replaceAll(`="topic`,`="/topic`)
                    })
                    setIsLoaded(true);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error.message);
                }
            ).catch((error) => {
                setDisplayHtml({
                    __html: ""
                })
            });
    },[])


    if (error || !isLoaded) {
        return <div />;
    } else {
        return (
            <>
                <StyledReadingSection dangerouslySetInnerHTML={displayHtml} />
            </>
        );
    }

}

export default TopTopics;