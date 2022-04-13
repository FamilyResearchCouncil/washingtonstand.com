import HeadTag from "../../components/layout/HeadTag";
import NewsList from "../../components/subComponents/NewsList";
import {StyledContentContainer} from "../../components/layout/sections/contentContainer";
import React from "react";

const NewsPage = () => (
    <>
        <HeadTag title="News" description="" />
        <StyledContentContainer>
        <NewsList />
        </StyledContentContainer>
    </>
);

export default NewsPage;
