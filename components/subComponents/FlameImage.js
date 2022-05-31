import Image from "next/image";
import styled from "styled-components";

const FlameWrapper = styled.div`
  text-align: center;
  margin-top: 8rem;
`

const FlameImage = (props) => (
    <FlameWrapper>
        <Image src="/img/Flame_icon.svg" height={props.height||50} width={props.width||50}/>
    </FlameWrapper>
);

export default FlameImage;