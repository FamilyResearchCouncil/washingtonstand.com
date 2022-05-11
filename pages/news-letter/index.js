import {StyledReadingSection} from "../../components/subComponents/ReadingTextBlock";
import { useRouter } from 'next/router'
import React, { useState } from "react";
import appUrls from "../../storage/baseUrls.json"
import SubmitButton from "../../components/subComponents/SubmitButton";
import styled from "styled-components";
import {StyledGreyBox} from "../../components/subComponents/GreyFormBox";

const SubscriptionForm = styled.form`
  display: grid;
  width: 100%;
  max-width: ${({theme}) => theme.widths.textInputMax};
  grid-gap: 1.5rem;
  
  label { 
    display: none;
    height: 0;
  }
  
  input {
    display: block;
    width: 100%;
    border: none;
    border-radius: 0;
    padding: 1.5rem;
    transition: all .3s ease;
    &.inputError {
      border: solid 1px ${({theme}) => theme.colors.errorRed};
    }
  }
  span {
    text-align: center;
    color:  ${({theme}) => theme.colors.errorRed};
  }

  p {
    text-align: center;
    font-style: italic;
    
    a {
      color: ${({theme}) => theme.colors.primaryBlue};
    }
  }
`

const handleSuccess = (responseDetails,router) => {

    let queryData = { success: responseDetails.success };
    if (queryData.success) {
        queryData.confirmationNubmer = responseDetails.data.rid;
        queryData.first_name = responseDetails.data.person_first_name;
        queryData.last_name = responseDetails.data.person_last_name;
        queryData.email_addr = responseDetails.data.email_addr;
    }
    router.push({
            pathname: appUrls.urlDirectories.confirmation,
            query: queryData
        },
        appUrls.urlDirectories.confirmation
    );
}

const NewsLetterForm = () => {
    const router = useRouter();
    const routeQuery = router.query;

    const [inputErrors,setInputErrors] = useState([]);
    const [submitAttempts,setSubmitAttempts] = useState(0);

    const handleChange = event => {
        if (inputErrors.length) {
            setInputErrors(inputErrors.filter(inputName => inputName != event.target.id));
        }
    }

    const handleFailure = (responseDetails) => {
        console.log(responseDetails);
        setInputErrors(responseDetails.inputErrors);
        console.log(inputErrors)
    }

    const registerSubscription = async event => {
        event.preventDefault(); // don't redirect the page
        // where we'll add our form logic
        setSubmitAttempts(submitAttempts + 1);
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
        .then(res => res.json())
        .then(data => {
            if ("inputErrors" in data) {
                handleFailure(data);
            } else {
                handleSuccess(data, router);
            }
        })

        // const result = await res.json()
        //
        // console.log(result);

        // return result;

    }


    return (
        <>
            <StyledReadingSection>
                <StyledGreyBox>
                    <h2>FILL OUT THIS FORM TO GET OUR NEWSLETTER DIRECTLY IN YOUR INBOX!</h2>
                    <SubscriptionForm onSubmit={registerSubscription}>

                            <label htmlFor="email_addr">Email</label>
                            <input
                                id="email_addr"
                                type="text"
                                autoComplete="email_addr"
                                defaultValue={`${routeQuery.email_addr ? routeQuery.email_addr : ""}`}
                                placeholder={`Email Address*`}
                                required
                                onChange={handleChange}
                                className={`${inputErrors.includes("email_addr") ? "inputError":""}`} />

                            <label htmlFor="person_first_name">First Name</label>
                            <input
                                id="person_first_name"
                                type="text"
                                autoComplete="person_first_name"
                                defaultValue={``}
                                placeholder={`First Name*`}
                                required
                                onChange={handleChange}
                                className={`${inputErrors.includes("person_first_name") ? "inputError":""}`} />

                            <label htmlFor="person_last_name">Last Name</label>
                            <input
                                id="person_last_name"
                                type="text"
                                autoComplete="person_last_name"
                                defaultValue={``}
                                placeholder={`Last Name*`}
                                required
                                onChange={handleChange}
                                className={`${inputErrors.includes("person_last_name") ? "inputError":""}`} />

                            <label htmlFor="zip">Zip Code</label>
                            <input
                                id="zip"
                                type="text"
                                autoComplete="zip"
                                defaultValue={``}
                                placeholder={`ZIP Code*`}
                                required
                                onChange={handleChange}
                                className={`${inputErrors.includes("zip") ? "inputError":""}`} />

                            <input id="item_code" type="hidden" autoComplete="item_code" defaultValue={``} />
                        {
                            submitAttempts > 3 ?
                                <p>It appears you've tried this a few times now.<br/> Thank you for your patience, but we're likely having technical issues. You're welcome to keep trying or contact us about the issue <a href={`https://www.frc.org/contact`}>here</a>.</p>
                                : <></>
                        }
                        <SubmitButton type={`submit`}>
                            SUBMIT
                        </SubmitButton>
                        {
                            inputErrors.length?
                                <span>Please complete the following fields</span>
                                : <></>
                        }
                    </SubscriptionForm>
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