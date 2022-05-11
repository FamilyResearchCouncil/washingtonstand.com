import styled from "styled-components";

export const StyledGreyBox = styled.section`
  background-color: ${({theme}) => theme.colors.primaryGrey};
  box-shadow: 0px 0px 12px ${({theme}) => theme.colors.alternateGrey};
  display: grid;
  padding: 6rem;
  justify-items: center;
  h2 {
    font-weight: 400;
    max-width: ${({theme}) => theme.widths.textInputMax};
    text-align: center;
  }
`;
