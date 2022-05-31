import styled from 'styled-components';

export const StyledGreySection = styled.section`
  color: ${({ theme }) => theme.colors.isBlack};
  background-color: ${({ theme }) => theme.colors.primaryGrey};
  padding: ${({ theme }) => theme.padding.sectionPadding};
`;