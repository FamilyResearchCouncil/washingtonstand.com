import React, { useEffect, useState } from "react";
import {StyledReadingSection} from "./readingTextBlock";

const DisplayPublicationHtml = (props) => {
    const [error, setError] = useState(null);
    const [displayHtml, setDisplayHtml] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() =>{
        fetch(`https://api.frc.org/api/webtext/${props.item_code}.cfm`)
            .then(res => res.text())
            .then(
                (result) => {
                    setDisplayHtml({
                        __html: result
                    })
                    setIsLoaded(true);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error);
                    setIsLoaded(true);
                    setError(error.message);
                }
            );
    })


    if (error) {
        useEffect(() => {
            window.location.href = "/404";
        }, []);
    } else if (!isLoaded) {
        return <div>
                    <StyledReadingSection>Publication Loading...
                    </StyledReadingSection>
                </div>;
    } else {
        return (
            <>
            <StyledReadingSection>
                <div dangerouslySetInnerHTML={displayHtml} />
            </StyledReadingSection>
            </>
        );
    }

}


export default DisplayPublicationHtml;
