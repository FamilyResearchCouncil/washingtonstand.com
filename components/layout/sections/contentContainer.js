import styled from 'styled-components';

export const StyledContentContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  position: relative;
  padding: 0 2rem;
  
  @media (min-width: ${({ theme }) => theme.breakPoints.small}) {
    
  }
  
  @media (min-width: ${({ theme }) => theme.breakPoints.medium}) {
    max-width: ${({ theme }) => theme.widths.mediumMaxWidth};
  }

  @media (min-width: ${({ theme }) => theme.breakPoints.large}) {
    max-width: ${({ theme }) => theme.widths.largeMaxWidth};
  }

  @media (min-width: ${({ theme }) => theme.breakPoints.xLarge}) {
    max-width: 1050px;
  }
  
  @media (min-width: 1300px) {
    max-width: ${({ theme }) => theme.widths.xlargeMaxWidth};
  }
  
`;