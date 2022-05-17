import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import NewsList from "../NewsList";
import styled from "styled-components";

const PaginationWrap = styled.div`
  margin-top: 6rem;
  
  ul {
    list-style: none;
    text-align: center;
    
    li {
      display: inline-block;
      margin: 0 .1rem;
      padding: .8rem 1.5rem;
      background-color: ${({theme}) => theme.colors.primaryGrey};
      transition: all .2s ease;
      
      &.selected {
        background-color: ${({theme}) => theme.colors.primaryYellow};
        color: ${({theme}) => theme.colors.isWhite};
      }
      
      &:hover {
        cursor: pointer;
        background-color: ${({theme}) => theme.colors.alternateGrey};
        color: ${({theme}) => theme.colors.isWhite};
      }
      
      &:first-child, &:last-child  {
        background-color: ${({theme}) => theme.colors.primaryBlue};
        color: ${({theme}) => theme.colors.isWhite};
        padding: .8rem 1.8rem;
      }
      &:first-child {
        border-radius: 4rem 0 0 4rem;
      }
      &:last-child {
        border-radius: 0 4rem 4rem 0;
      }
    }
  }
`

const ListingGrid = styled.div`
  display: grid;
  grid-gap: 3rem;

  h2 {
    
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

    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState(props.itemList.slice(itemOffset,props.itemsPerPage));
    // const [pageCount, setPageCount] = useState(0);

    // useEffect(() => {
    //     // Fetch items from another resources.
    //     const endOffset = itemOffset + props.itemsPerPage;
    //     // setCurrentItems(props.itemList.slice(itemOffset, endOffset));
    //     setPageCount(Math.ceil(props.itemList.length / props.itemsPerPage));
    // }, [itemOffset, props.itemsPerPage]);
    //
    // // Invoke when user click to request another page.
    // const handlePageClick = (event) => {
    //     const newOffset = (event.selected * props.itemsPerPage) % props.itemList.length;
    //     setItemOffset(newOffset);
    // };

    const handleMoreButtonClick = async () => {
        setItemOffset(itemOffset + props.itemsPerPage);
        setCurrentItems(currentItems.concat(props.itemList.slice(itemOffset,props.itemsPerPage)));
    };

    return (
        <>
            <ListingGrid className={`${props.columnClass}`}>
                {/*{JSON.stringify(currentItems)}*/}
                <NewsList list={currentItems} displayImg={true} displayByLine={props.displayByLine}/>
            </ListingGrid>
            <PaginationWrap>
            {
                props.itemsPerPage < props.itemList.length ?
                    <button onClick={handleMoreButtonClick}>MORE </button>
                    // <ReactPaginate
                    //     breakLabel="..."
                    //     nextLabel="&#8594;"
                    //     onPageChange={handlePageClick}
                    //     pageRangeDisplayed={2}
                    //     pageCount={pageCount}
                    //     previousLabel="&#8592;"
                    //     renderOnZeroPageCount={null}
                    // />
                    : <></>
            }
            </PaginationWrap>
        </>
    );
}


export default PaginatedItems;