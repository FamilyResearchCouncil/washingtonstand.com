import Image from "next/image";
import React from "react";
import styled from "styled-components";

const StyledImage = styled(Image)`
  border-radius: 50%;
  border: solid 3px ${({theme}) => theme.colors.primaryBlue} !important;
`

const AuthorImage = (props) => (
    <>
        <StyledImage src={props.src} width={props.width} height={props.height} />
    </>
);

export default AuthorImage;