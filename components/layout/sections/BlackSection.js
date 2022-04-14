import styled from 'styled-components';

export const StyledBlackSection = styled.section`
  color: ${({ theme }) => theme.colors.isWhite};
  background-color: ${({ theme }) => theme.colors.isBlack};
  padding: ${({ theme }) => theme.padding.sectionPadding};
`;