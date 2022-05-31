import styled from "styled-components";

export const MoreDownArrowButton = styled.button`
  background-color: transparent;
  border: none;
  width: 100%;
  margin-top: 6rem;
  font-size: 2.4rem;
  font-weight: bold;
  position: relative;
  color: ${({theme}) => theme.colors.primaryYellow};
  
  ::after {
    content: "\u2193";
    display: inline-block;
    width: 2rem;
    position: absolute;
    bottom: -3rem;
    left: calc(50% - 1rem);
    transition: all .3s ease;
  }
  
  &:hover {
    cursor: pointer;
    ::after {
      bottom: -3.5rem;
    }
  }
  
`;