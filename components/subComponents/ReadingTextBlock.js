import styled from 'styled-components';
import {StyledContentContainer} from "../layout/sections/contentContainer";

export const StyledReadingSection = styled(StyledContentContainer)`
  max-width: ${ ({ theme }) => theme.widths.readingWidth };
  text-align: ${props => props.alignment === '' ? 'left' : props.alignment };
  font-size: 1.8rem;
  line-height: 1.6;
`;