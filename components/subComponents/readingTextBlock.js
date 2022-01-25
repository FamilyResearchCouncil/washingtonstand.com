import styled from 'styled-components';

export const StyledReadingSection = styled.div`
  max-width: ${ ({ theme }) => theme.widths.readingWidth };
  margin: 0 auto;
  text-align: ${props => props.alignment === '' ? 'left' : props.alignment };
  font-size: 1.8rem;
  line-height: 1.6;
`;