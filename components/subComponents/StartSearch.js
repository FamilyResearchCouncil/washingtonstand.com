import { useRouter } from 'next/router'
import React from "react";
import styled from "styled-components";
import appUrls from "../../storage/baseUrls.json"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

const StyledMenuSearchForm = styled.form`
  width: 100%;
  max-width: 30rem;
  display: grid;
  align-self: center;
  grid-gap: 0;
  position: relative;
  input {
    font-size: 2rem;
    padding: 1rem 2rem;
    border: none;
    border-bottom: solid 1px ${({theme}) => theme.colors.isWhite};
    background-color: transparent;
    color: ${({theme}) => theme.colors.isWhite};
    &::placeholder {
      color: ${({theme}) => theme.colors.isWhite};
    }
    &:focus,&:active {
      box-shadow: none;
      border: none;
    }
  }
  button {
    background-color: transparent;
    color: ${({theme}) => theme.colors.isWhite};
    position: absolute;
    right: 0;
    top: .5rem;
    font-size: 2.6rem;
    border: none;
    transition: all .3s ease;
    &:hover {
      cursor: pointer;
    }
  }
  
`

const StartSearch = () => {
    const router = useRouter()

    const startSiteSearch = event => {
        event.preventDefault() // don't redirect the page
        console.log(event);
        router.push({
                pathname: event.target.target,
                query: {
                    search_phrase: event.target.search_phrase.value
                }
            },
            event.target.target
        );
    }


    return (
        <StyledMenuSearchForm method="POST" target={appUrls.urlDirectories.search} onSubmit={startSiteSearch}>
            <input id="search_phrase" type="text" placeholder="Search..." autoComplete="email_addr" required />
            <button type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} size="xs"/>
            </button>
        </StyledMenuSearchForm>
    )
};

export default StartSearch;