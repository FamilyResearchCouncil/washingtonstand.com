import HeadTag from "../components/layout/HeadTag"
import styles from '../styles/Main.module.css'
import {StyledPrimaryBlueSection} from "../components/layout/sections/primaryBlueSection";
import {StyledContentContainer} from "../components/layout/sections/contentContainer";
import VideoContainer from "../components/subComponents/videoContainer";
import {StyledReadingSection} from "../components/subComponents/readingTextBlock";
import styled from 'styled-components';

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
      <HeadTag title="Site Domain" description="Description of the site" />

      <FourOhFourSection>
            <h2>May 2022</h2>
      </FourOhFourSection>
    </>
);

export default Home;
