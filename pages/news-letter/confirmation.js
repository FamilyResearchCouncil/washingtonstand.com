import {StyledReadingSection} from "../../components/subComponents/ReadingTextBlock";
import { useRouter } from 'next/router'
import React from "react";
import styled from "styled-components";
import appUrls from "../../storage/baseUrls.json";
import Link from "next/link";
import Image from "next/image";
import {StyledGreyBox} from "../../components/subComponents/GreyFormBox";


const BlueLink = styled.a`
  color: ${({theme}) => theme.colors.primaryBlue};
  span {
    display: inline-block;
    transition: all .3s ease;
  }
  &hover {
    span {
      transform: translateX(.5rem);
    }
  }
`

const SuccessBlockWrap = styled.div`
  display: grid;
  grid-gap: 2rem;
  align-items: center;
  justify-items: center;
  text-align: center;
  grid-template-rows: auto auto auto 1fr 1.5rem;
  h2 {
    margin: 0;
  }
`



const SuccessBlock = (props) => (
    <>
        <SuccessBlockWrap>
            <h2>HOORAY!</h2>
            <p>You have successfully joined our newsletter.</p>
            <div>
                <BlueLink href={`${appUrls.urlDirectories.home}`}>
                    <a>BACK TO HOME <span>&#8594;</span></a>
                </BlueLink>
            </div>
            <div>
                <Image src="/img/Flame_icon.svg" height={100} width={100}/>
            </div>
            {/*{JSON.stringify(props)}*/}
            <div>
                <small>
                    Not what you wanted?<br/>
                    Unsubscribe <a>here</a>.
                </small>
            </div>
        </SuccessBlockWrap>
    </>
);

const FailureBlock = (props) => (
    <>
        <h2>WHOOPS, THAT'S PROBABLY US</h2>
        <p>It looks like something went wrong.</p>
        <div>
            <BlueLink href={`${appUrls.urlDirectories.newsLetter}`}><a>TRY AGAIN <span>&#8594;</span></a></BlueLink>
        </div>
        <div>
            <Image src="/img/Flame_icon.svg" height={100} width={100}/>
        </div>
        {/*{JSON.stringify(props)}*/}
        <div>
            <small>
                Still not working?<br/>
                Return to <Link href={`/`}><a>Home</a></Link>.
            </small>
        </div>
    </>
);

const NewsLetterForm = () => {
    const router = useRouter();
    const routeQuery = router.query;

    console.log("query",routeQuery);

    return (
        <>
            <StyledReadingSection>
                <StyledGreyBox>
                    {

                        routeQuery.success === "true" ?
                        <SuccessBlock {...routeQuery} /> : <FailureBlock {...routeQuery}/>

                    }
                </StyledGreyBox>
            </StyledReadingSection>
        </>
    )
};

export async function getServerSideProps(context) {

    // res.status(200).json({success: "forced"})
    // if (context.req.method === "POST") {
    //     context.response.statusCode(200);
    // }
    return { props: {  } };
}

export default NewsLetterForm;

