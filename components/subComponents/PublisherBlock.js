import styled from 'styled-components';
import PublisherLogo from "../../public/img/FRC_2017logo_white.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

export const SocialDiv = styled.div`
  margin-top: 1rem;
  .round {
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
    color: black;
    background-color: white;
    margin: .5rem;
    padding: .5rem;
    display: inline-flex;
    align-centent: center;
    justify-content: center;
  }
`;


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

  @media (min-width: ${({ theme }) => theme.breakPoints.xLarge}) {
    div.linkWrapper {
      margin-top: 0;
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
        <a href="https://www.facebook.com/WashingtonStand" className="round"><FontAwesomeIcon icon={faFacebookF}/></a>
        <a href="https://twitter.com/WSHStand" className="round"><FontAwesomeIcon icon={faTwitter} /></a>
        <a href="https://www.instagram.com/washingtonstand/" className="round"><FontAwesomeIcon icon={faInstagram}/></a>
      </SocialDiv>
    </Wrapper>
  </>
);

export default PublisherBlock;