import React, { useState, useEffect } from "react";
import {StyledContentContainer} from "../layout/sections/contentContainer";


const TopTopics = () => {
    const [error, setError] = useState(null);
    const [displayHtml, setDisplayHtml] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() =>{
        try {
            fetch(`https://apiv2.frc.org/api/webtext/WX22D07.cfm?trackDownload=0`)
                .then(res => {
                    return (res.ok) ? res.text() : Promise.resolve("");
                })
                .then(
                    (result) => {
                        setDisplayHtml({
                            __html: result.replaceAll(`="topic`, `="/topic`)
                        })
                        setIsLoaded(true);
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error.message);
                    }
                ).catch((error) => {
                setError(error.message);
                setDisplayHtml({
                    __html: ""
                })
            });
        } catch (e) {
            setError(error.message);
            setDisplayHtml({
                __html: ""
            })
        }
    },[])


    if (error || !isLoaded) {
        return <div />;
    } else {
        return (
            <>
                <StyledContentContainer dangerouslySetInnerHTML={displayHtml} />
            </>
        );
    }

}

export default TopTopics;