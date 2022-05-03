import {StyledReadingSection} from "../../components/subComponents/ReadingTextBlock";
import { useRouter } from 'next/router'
import React from "react";
import styled from "styled-components";

const GreyBox = styled.section`
  background-color: ${({theme}) => theme.colors.primaryGrey};
  display: grid;
  padding: 6rem;
  justify-content: center;
`

const NewsLetterForm = () => {
    const router = useRouter();
    const routeQuery = router.query;

    const registerSubscription = async event => {
        event.preventDefault(); // don't redirect the page
        // where we'll add our form logic

        const res = await fetch("/api/submitSubscription", {
            body: JSON.stringify({
                person_first_name: event.target.person_first_name.value,
                person_last_name: event.target.person_last_name.value,
                email_addr: event.target.email_addr.value,
                zip: event.target.zip.value
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })

        const result = await res.json()

        console.log(result);

        return result;

    }


    return (
        <>
            <StyledReadingSection>
                <GreyBox>
                    SUCCESS
                </GreyBox>
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

