import styled from "styled-components";

export const PublicationTypeGreyText = styled.span`
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.2rem;
  color: ${({theme}) => theme.colors.alternateGrey};
  line-height: 1;
  display: block;
  margin-top: 1.5rem;
`;