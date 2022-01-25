import styled from 'styled-components';

export const StyledPrimaryBlueSection = styled.section`
  color: ${({ theme }) => theme.colors.isWhite};
  background-color: ${({ theme }) => theme.colors.primaryBlue};
  padding: ${({ theme }) => theme.padding.sectionPadding};
  h2 {
    color: ${({ theme }) => theme.colors.altLightBlue};
  }
`;