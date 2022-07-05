import AppSearchIo from "../components/subComponents/AppSearchIo";
import { useRouter } from 'next/router'
import React from "react";
import {StyledReadingSection} from "../components/subComponents/ReadingTextBlock";

const h1Style = {
    color: "var(--theme-colors-primaryYellow)",
    textAlign: "center",
    fontSize: "3rem"
}

const TestPage = () => {
    const router = useRouter();
    const routeQuery = router.query;
    return (
        <>
          <StyledReadingSection>
          <h1 style={h1Style}>SEARCH</h1>
          <AppSearchIo initialSearch={`${routeQuery.search_phrase ? routeQuery.search_phrase : ""}`} />
          </StyledReadingSection>
        </>
    );
};

export default TestPage;