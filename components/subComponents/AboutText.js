import {StyledReadingSection} from "./ReadingTextBlock";
import styled from "styled-components";
import GetAboutText from "../../helpers/GetAboutText";
import React, {useEffect, useState} from "react";

const TextDiv = styled.div`
  @media (min-width: ${({ theme }) => theme.breakPoints.large}) {
    padding-left: 2rem;
 }
`;

const styling = {
    h2: {
        marginBottom: 0
    },
}

const AboutBlock = (props) => {
    // const [error, setError] = useState(null);
    // const [displayHtml, setDisplayHtml] = useState({__html:"<h2>hello there</h2>"});
    // const [isLoaded, setIsLoaded] = useState(false);
    //
    // useEffect(() => {
    //
    //     const fetchData = async () => {
    //         const data = await GetAboutText();
    //         setDisplayHtml(data);
    //         setIsLoaded(true);
    //
    //     }
    //
    //     fetchData()
    //         // make sure to catch any error
    //         .catch(() => setError(true));
    //
    // },[])
    //
    // if (error || !isLoaded) {
    //     return <div />;
    // } else {
        return (
            <>
                <StyledReadingSection>
                    <h2 style={styling.h2}>ABOUT</h2>
                    <TextDiv>
                        {/*<AboutText displayHtml={displayHtml}/>*/}
                        <p>The Washington Stand is Family Research Council’s outlet for news and commentary from a biblical worldview. The Washington Stand is based in Washington, D.C. and is published by FRC, whose mission is to advance faith, family, and freedom in public policy and the culture from a biblical worldview. We invite you to stand with us by&nbsp;<a href="https://www.frc.org/d-2205_73" target="_blank">partnering with FRC</a>.</p>
                    </TextDiv>
                </StyledReadingSection>
            </>
        );
    // }
}

export default AboutBlock;

const AboutText = (props) => (
            <p dangerouslySetInnerHTML={props.displayHtml} />
        );

export {AboutText};