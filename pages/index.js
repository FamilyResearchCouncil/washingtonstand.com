import HeadTag from "../components/layout/HeadTag"
import styles from '../styles/Main.module.css'
import {StyledPrimaryBlueSection} from "../components/layout/sections/primaryBlueSection";
import {StyledContentContainer} from "../components/layout/sections/contentContainer";
import VideoContainer from "../components/subComponents/videoContainer";
import {StyledReadingSection} from "../components/subComponents/readingTextBlock";
import styled from 'styled-components';
import MainLogo from "../public/img/WashStand_v5.svg";
import React from "react";

const FourOhFourSection = styled.section`
  display: grid;
  align-content: center;
  justify-content: center;
  height: calc(80vh - 100px);
  h1 {
    margin-bottom: 5rem;
  }
`;

const Home = () => (
  <>
      <HeadTag title="The Washington Stand" description="" />

      <FourOhFourSection>
            <StyledReadingSection style={{ textAlign: 'center' }}>
            <MainLogo />
            <h1 style={{ fontSize: '0px', display: "none" }}>The Washingoton Stand</h1>
            <h2>May 2022</h2>
            </StyledReadingSection>
      </FourOhFourSection>
    </>
);

export default Home;
