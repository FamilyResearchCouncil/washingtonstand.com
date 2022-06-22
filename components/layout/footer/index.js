import {StyledBlackSection} from "../sections/BlackSection";
import {StyledContentContainer} from "../sections/contentContainer";
import styled from 'styled-components';
import AboutBlock from "../../subComponents/AboutText";
import PublisherBlock from "../../subComponents/PublisherBlock";
import styles from "./Footer.module.css"
import Script from "next/script";
import React from "react";

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
    <footer className={styles.footer}>
        <StyledBlackSection>
            <StyledContentContainer>
            <FooterGrid>
                <AboutBlock />
                <PublisherBlock />
            </FooterGrid>
            </StyledContentContainer>
        </StyledBlackSection>
        <Script
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
                      console.log("loading Sajari");
                      var _sj = _sj || [];
                      _sj.push(['project', '1535051769990227710']);
                      _sj.push(['collection', 'washington-stand-com']);
                      (function () {
                        var sj = document.createElement('script');
                        sj.type = 'text/javascript';
                        sj.async = true;
                        sj.src = '//cdn.sajari.com/js/sj.js';
                        var s = document.getElementsByTagName('script')[0];
                        s.parentNode.insertBefore(sj, s);
                      })();
                `}}
        />
    </footer>
);

export default Footer;
