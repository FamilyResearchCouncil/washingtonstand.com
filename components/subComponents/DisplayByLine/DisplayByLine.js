import {useAPIStaff} from "../../../contexts/AuthorListContext";
import React, {useEffect, useState} from "react";
import styles from "./DisplayByLine.module.css"
import styled from "styled-components";
import Link from "next/link";
import appUrls from "../../../storage/baseUrls.json"


const ByLineWrapper = styled.div`
  display: grid;
  //grid-template-columns: auto auto 1fr;
  grid-gap: 1rem;
  font-weight: 600;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakPoints.medium}) {
    grid-template-columns: auto auto 1fr;  
  }
  
`

export const DisplayAuthImages = (props) => (
    <div className={styles.authorImages}>
        {
            props.authors.map(author => (
                <img className={styles.authorImage} src={author.AUTHOR_IMG} />
            ))
        }
    </div>
);

export const DisplayAuthNames = (props) => (
    <div>
        {
            props.authors.map((author,idx) => {
                let spacerString = "";
                if (idx !== (props.authors.length-1)) {
                    spacerString = (idx === (props.authors.length-2)) ? ", and " : ", ";
                    spacerString = (props.authors.length === 2) ? " and " : spacerString;
                }

                return (
                    <span>
                        <Link href={`${appUrls.urlDirectories.staff}/${author.AUTHOR_SLUG}`}>
                            <a className={styles.authorLink}>{author.AUTHOR_NAME}</a>
                        </Link>
                        {spacerString}
                    </span>
                )})
        }
    </div>
);

const DisplayByLine = (props) => (
    // // props.personalIdArray.push("6141078");
    // const { staff, isLoading } = useAPIStaff();
    // const [ pubAuthors, setPubAuthors ] = useState([]);
    //
    // useEffect(() => {
    //     if (!isLoading) {
    //         setPubAuthors(staff.filter(author => props.personalIdArray.includes(author.PERSONAL_ID)));
    //         // console.log(pubAuthors);
    //     }
    // }, []);

    // if (!isLoading) {

        // return (
            <>
                {/*{JSON.stringify(props)}*/}
                <ByLineWrapper>
                <DisplayAuthImages className={`images`} authors={props.authorArray}/>
                <DisplayAuthNames className={`names`} authors={props.authorArray}/>
                <span className={styles.publishDate}>{props.DISPLAY_MEDIA_DATE}</span>
                </ByLineWrapper>
            </>
        // );
    // } else {
    //     return (
    //         <>
    //
    //         </>
    //     );
    // }
);

export default DisplayByLine;