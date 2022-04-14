import styled from 'styled-components';
import PublisherLogo from "../../public/img/FRC_2017logo_white.svg";

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
`

const PublisherBlock = () => (
    <>
        <Wrapper>
            <strong>PUBLISHED BY</strong>
            <PublisherLogo style={{ height: 100, width: 100 }} alt="Family Research Council"/>
            &copy;{new Date().getFullYear()} Family Research Council<br />
            1-800-225-4008<br />
            801 G Street NW<br />
            Washington, D.C. 20001<br />
            Privacy Policy | Contact Us
        </Wrapper>
    </>
);

export default PublisherBlock;