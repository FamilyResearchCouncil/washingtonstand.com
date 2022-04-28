import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import NewsList from "../NewsList";
import styled from "styled-components";

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

    const [currentItems, setCurrentItems] = useState(props.itemList);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + props.itemsPerPage;
        setCurrentItems(props.itemList.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(props.itemList.length / props.itemsPerPage));
    }, [itemOffset, props.itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * props.itemsPerPage) % props.itemList.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <ListingGrid className={`${props.columnClass}`}>
                <NewsList list={currentItems} displayImg={true} />
            </ListingGrid>

            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            />
        </>
    );
}


export default PaginatedItems;