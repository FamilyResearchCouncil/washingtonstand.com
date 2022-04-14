import {StyledBlackSection} from "../sections/BlackSection";
import {StyledContentContainer} from "../sections/contentContainer";
import styled from 'styled-components';
import AboutBlock from "../../subComponents/AboutText";
import PublisherBlock from "../../subComponents/PublisherBlock";

const FooterGrid = styled.div`
  display: grid;
  grid-gap: 6rem;
  
  @media (min-width: ${({ theme }) => theme.breakPoints.medium}) {
  }
  
  @media (min-width: ${({ theme }) => theme.breakPoints.large}) {
    grid-template-columns: 1fr auto;
  }
  
  @media (min-width: ${({ theme }) => theme.breakPoints.xLarge}) {
      
  }
`;

const Footer = () => (
    <footer>
        <StyledBlackSection>
            <StyledContentContainer>
            <FooterGrid>
                <AboutBlock />
                <PublisherBlock />
            </FooterGrid>
            </StyledContentContainer>
        </StyledBlackSection>
    </footer>
);

export default Footer;
