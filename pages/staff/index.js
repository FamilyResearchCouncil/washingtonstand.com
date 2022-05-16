import HeadTag from "../../components/layout/HeadTag";
import GetAuthorsDetails from "../../helpers/GetAuthorsDetails";
import styled from "styled-components";
import Link from "next/link";
import appUrls from "../../storage/baseUrls.json";
import AuthorImage from "../../components/subComponents/AuthorImage";
import {StyledContentContainer} from "../../components/layout/sections/contentContainer";


const StaffGrid = styled.div`
  display: grid;
  grid-gap: 6rem;
  grid-template-columns: repeat(2,1fr);
  max-width: 900px;
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakPoints.medium}) {
    grid-template-columns: repeat(4,1fr);
  }
  
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
                <AuthorImage src={props.imageUrl} width={100} height={100} layout='responsive'/>
                <h4>{props.name}</h4>
                <h5>{props.title}</h5>
            </a>
        </Link>
    </>
);

const StaffPage = (props) => (
    <>
        <HeadTag title="Washington Stand Writers" description="" />
        <StyledContentContainer>
            <StaffGrid>
            {
                props.authorArray.map(staff => (
                    <StaffItem key={staff.PERSONAL_ID} name={staff.AUTHOR_NAME} imageUrl={staff.AUTHOR_IMG} title={staff.AUTHOR_TITLE} slug={staff.AUTHOR_SLUG}/>
                ))
            }
            </StaffGrid>
        </StyledContentContainer>
    </>
);


export async function getStaticProps() {

    const authors = await GetAuthorsDetails();
    let pageProps = {};

    pageProps.authorArray = authors.sort((authorA,authorB) => authorA.LAST_NAME.localeCompare(authorB.LAST_NAME));


    return {
        props: {...pageProps},
        revalidate: 60
    };
}


export default StaffPage;
