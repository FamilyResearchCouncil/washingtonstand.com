import HeadTag from "../../../components/layout/HeadTag";
import Image from "next/image";
import React, {useState} from "react"
import {StyledContentContainer} from "../../../components/layout/sections/contentContainer"
import {useAPIStaff} from "../../../contexts/AuthorListContext"


const Bio = (props) => {

    const { staff, isLoading } = useAPIStaff();
    const [staffData,setStaffData] = useState({});
    const [pageLoaded,setpageLoaded] = useState(false);
    const thisStaff = staff.filter(staff => staff.AUTHOR_SLUG == props.id).pop();
//tony-perkins
    if (!isLoading) {
        fetch(`https://api.frc.org/api/webtext/${thisStaff.BIO_ITEM}.cfm`)
            .then(res => res.text())
            .then(
                (result) => {
                    console.log(result);
                    thisStaff.displayHtml = {
                        __html: `${result}`
                    }
                    setStaffData(thisStaff);
                    setpageLoaded(true);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error);
                    // setIsLoaded(true);
                    // setError(error.message);
                }
            );
    }

    return (
        <>
            {pageLoaded ?
                <StyledContentContainer>
                    <HeadTag title={staffData.AUTHOR_NAME} description="" />
                    <Image src={staffData.AUTHOR_IMG} width={150} height={150} />
                    <h1>{staffData.AUTHOR_NAME}</h1>
                    <h2>{staffData.AUTHOR_TITLE}</h2>
                    <div dangerouslySetInnerHTML={staffData.displayHtml} />
                    <center>
                        <Image src="/img/Flame_icon.svg" height={50} width={50} />
                    </center>
                </StyledContentContainer>
                :
                <p>Loading...</p>
            }
        </>
    )
};

Bio.getInitialProps = ({query}) => {

    let pageProps = query;
    // const { staff, isLoading } = useAPIStaff();
    // pageProps = staff.filter(staff => staff.AUTHOR_SLUG == query.id);
    //
    // await fetch(`https://api.frc.org/api/webtext/${pageProps.BIO_ITEM}.cfm`)
    //     .then(res => res.text())
    //     .then(
    //         (result) => {
    //             console.log(result);
    //             pageProps.displayHtml = {
    //                 __html: `${result}`
    //             }
    //             // setIsLoaded(true);
    //             // setItems(result);
    //         },
    //         // Note: it's important to handle errors here
    //         // instead of a catch() block so that we don't swallow
    //         // exceptions from actual bugs in components.
    //         (error) => {
    //             console.log(error);
    //             // setIsLoaded(true);
    //             // setError(error.message);
    //         }
    //     );

    return pageProps;
}

export default Bio;