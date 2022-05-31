import styled from 'styled-components';

export const StyledMenu = styled.nav`
  display: flex;
  justify-content: right;
  height: 100vh;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.mobileTransparentBlack};
  width: 100vw;
  text-align: left;
  padding: 10rem 2rem ;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 60;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
  overflow-y: scroll;
  
  a {
    font-size: 3rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: ${({ theme }) => theme.colors.isWhite};
    text-decoration: none;
    transition: color 0.3s linear;
    //margin-left: 3rem;
    text-align: center;
    
    &:hover {
      color: ${({ theme }) => theme.colors.isWhite};
    }
  }
  
  div.topicNews {
    padding-top: 6rem;
    strong {
      text-align: left;
      color:  ${({ theme }) => theme.colors.isWhite};
      font-size: 2rem;
      font-weight: 400;
      margin-left: 3rem;
    }
    
    a {
      display: block;
      font-size: 1.8rem;
      text-align: left;
      padding: 1.5rem 0;
      margin: .5rem 0 .5rem 3rem;
      :before {
        content: "- ";
        display: inline-block;
        font-weight: 200;
      }
    }  
  }
}

  @media (min-width: ${({ theme }) => theme.breakPoints.medium}) {
    padding: 8rem 2rem 2rem 2rem;
    width: 45vw;
    a {
      font-size: 2rem;
    }

  @media (min-width: ${({ theme }) => theme.breakPoints.large}) {
    width: 30vw;
  }

  @media (min-width: ${({ theme }) => theme.breakPoints.xLarge}) {

  }
  
`;