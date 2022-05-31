import React, { useEffect, useState } from "react";
import styled from "styled-components";
import appUrls from "../../storage/baseUrls.json";
import {useAPIStaff} from "../../contexts/AuthorListContext";
import Link from "next/link";

const StaffGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(4,1fr);
  max-width: 900px;
  margin: 0 auto;
  
  .staffDisplay {
    display: grid;
    grid-gap: 1rem;
    align-content: center;
    text-align: center;
    img {
      max-width: 110px;
    }
  }
`

const StaffItem = (props) => (
    <>
        <Link href={`${appUrls.urlDirectories.staff}/${props.slug}`} className={`staffDisplay`}>
            <a>
                <img src={`${props.imageUrl}`} />
                <h4>{props.name}</h4>
                <h5>{props.title}</h5>
            </a>
        </Link>
    </>
);

const StaffListing = () => {

    const { staff, isLoading } = useAPIStaff();

    return (<>
        <StaffGrid>
        {!isLoading ?
            staff.map(staff => (
                <StaffItem name={staff.AUTHOR_NAME} imageUrl={staff.AUTHOR_IMG} title={staff.AUTHOR_TITLE} slug={staff.AUTHOR_SLUG}/>
            ))
            :
            <p>Loading...</p>
        }
        </StaffGrid>
    </>);
}

export default StaffListing;
