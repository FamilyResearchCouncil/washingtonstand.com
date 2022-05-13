import styled from "styled-components";

const SubmitButton = styled.button`
  background-color: ${({theme}) => theme.colors.primaryBlue};
  color: ${({theme}) => theme.colors.isWhite};
  border-radius: 40px;
  border: none;
  padding: 1rem 2rem;
  &:hover {
    cursor: pointer;
  }
`;

export default SubmitButton;