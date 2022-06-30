import AppSearchIo from "../components/subComponents/AppSearchIo";
import React from "react";
import {StyledReadingSection} from "../components/subComponents/ReadingTextBlock";

const h1Style = {
    color: "var(--theme-colors-primaryYellow)",
    textAlign: "center",
    fontSize: "3rem"
}

const TestPage = () => (
  <>
      <StyledReadingSection>
      <h1 style={h1Style}>SEARCH</h1>
      <AppSearchIo />
      </StyledReadingSection>
  </>
);

export default TestPage;