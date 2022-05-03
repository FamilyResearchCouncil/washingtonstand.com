import { useRouter } from 'next/router'
import React from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 0;
  input {
    padding: .8rem 2rem;
    border: none;
    border-radius: 0;
  }
  button {
    background-color: ${({theme}) => theme.colors.primaryBlue};
    color: ${({theme}) => theme.colors.isWhite};
    font-size: 2.6rem;
    border: none;
    padding: 0 4rem;
    transition: all .3s ease;
    &:hover {
      cursor: pointer;
      padding: 0 3.5rem 0 4.5rem;
    }
  }
`

const NewsLetterForm = () => {
    const router = useRouter()

    const beginSignUp = event => {
        event.preventDefault() // don't redirect the page
        console.log(event);
        router.push({
                pathname: event.target.target,
                query: {
                    email_addr: event.target.email_addr.value
                }
            },
            event.target.target
        );
        //
        // // /news-letter
        //
        // const res = await fetch("/news-letter", {
        //     body: JSON.stringify({
        //         email_addr: event.target.email_addr.value
        //     }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     method: 'POST'
        // })
        //
        // const result = await res.json()
        //
        // console.log(result);
        //
        // return result;

    }


    return (
        <StyledForm method="POST" target="/news-letter" onSubmit={beginSignUp}>
            <input id="email_addr" type="text" placeholder="Email Address" autoComplete="email_addr" required />
            <button type="submit">&#8594;</button>
        </StyledForm>
    )
};

export default NewsLetterForm;