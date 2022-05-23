import React, { useState } from 'react';
import NewsList from "../NewsList";
import styled from "styled-components";
import {MoreDownArrowButton} from "../MoreDownArrowButton"

const ListingGrid = styled.div`
  display: grid;
  grid-gap: 3rem;

  h2 {MoreDownArrowButton
    
  }
  
  @media (min-width: ${({ theme }) => theme.breakPoints.medium}) {
    &.columns-3 , &.columns-2 {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: ${({ theme }) => theme.breakPoints.large}) {
    &.columns-3 {
      grid-template-columns: 1fr 1fr 1fr; 
    }
  }
  
`;

const PaginatedItems = (props) => {
    const [currentItems, setCurrentItems] = useState(props.itemList.slice(0,props.itemsPerPage));
    const handleMoreButtonClick = () => {
        let startIndex = currentItems.length;
        let endIndex = ( (currentItems.length + props.itemsPerPage) <= props.itemList.length ) ? currentItems.length + props.itemsPerPage : props.itemList.length;
        setCurrentItems(currentItems.concat(props.itemList.slice(startIndex,endIndex)));
    };

    return (
        <>
            <ListingGrid className={`${props.columnClass}`}>
                <NewsList list={currentItems} displayImg={true} displayByLine={props.displayByLine}/>
            </ListingGrid>
            {
                (   props.itemsPerPage < props.itemList.length && currentItems.length < props.itemList.length ) ?
                    <MoreDownArrowButton onClick={handleMoreButtonClick}>MORE </MoreDownArrowButton>
                    : <></>
            }
        </>
    );
}


export default PaginatedItems;