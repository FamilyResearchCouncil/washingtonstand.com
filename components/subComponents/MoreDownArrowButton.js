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
    content: "";
    display: inline-block;
    width: 0px;
    border-top: solid 1rem ${({theme}) => theme.colors.primaryYellow};
    border-left: solid 4rem transparent;
    border-right: solid 4rem transparent;
    position: absolute;
    bottom: -15px;
    left: calc(50% - 4rem);
    transition: all .3s ease;
  }
  
  &:hover {
    cursor: pointer;
    ::after {
      bottom: -2rem;
      //border-top: solid 1.5rem ${({theme}) => theme.colors.primaryYellow};
    }
  }
  
`;