import styled from 'styled-components';
import PublisherLogo from "../../public/img/FRC_2017logo_white.svg";
import {
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
} from "react-share";
import { SocialDiv } from './SocialSharing';

const Wrapper = styled.div`
  font-size: 1.2rem;
  display: grid;
  max-width: 100%;
  text-align: center;
  justify-items: center;
  strong {
    font-size: 1.6rem;
  }
  img, svg {
    max-width: 100%;
  }

  div.linkWrapper {
    margin-top: .3rem;
  }
  
  @media (min-width: ${({ theme }) => theme.breakPoints.large}) {
    div.linkWrapper {
      margin-top: -1rem;
    }
  }
`

const PublisherBlock = () => (
  <>
    <Wrapper>
      <strong>PUBLISHED BY</strong>
      <a href={`https://www.frc.org`}>
        <PublisherLogo style={{ height: 100, width: 100 }} alt="Family Research Council" />
      </a>
      &copy;{new Date().getFullYear()} Family Research Council<br />
      1-800-225-4008<br />
      801 G Street NW<br />
      Washington, D.C. 20001
      <div className={`linkWrapper`}>
        <a href={`https://frc.org/privacy-policy`}>Privacy Policy</a>  |  <a href={`https://frc.org/contact-frc`}>Contact Us</a>
      </div>
      <SocialDiv>
        <a href="https://www.facebook.com/WashingtonStand"><FacebookIcon borderRadius={8} size={40} round={true} iconFillColor={'black'}/></a> <a href="https://twitter.com/WSHStand"><TwitterIcon borderRadius={8} size={40} round={true} iconFillColor={'black'}/></a>
        {/* <a href=""><InstagramIcon borderRadius={8} size={40}/></a> */}
      </SocialDiv>
    </Wrapper>
  </>
);

export default PublisherBlock;