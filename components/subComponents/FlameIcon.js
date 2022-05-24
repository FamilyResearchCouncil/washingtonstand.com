import styled from "styled-components";
import Flame from "../../public/img/Flame_icon.svg";

const IconWrapper = styled.span`
  display: grid;
  align-items: center;
  justify-items: center;
  
  svg {
    max-height: ${props => props.height ? props.height : 12}rem;
  }
`;

const FlameIcon = (props) => (
    <>
        <IconWrapper {...props}>
            <Flame />
        </IconWrapper>
    </>
);

export default FlameIcon;


