import HeadTag from "../../../components/layout/HeadTag";
import Image from "next/image";
import {StyledContentContainer} from "../../../components/layout/sections/contentContainer";


const Post = (props) => (
    <>
        <HeadTag title={props.title} description="A Summary" />
        <StyledContentContainer>
            <Image src={props.itemImageUrl} width={763} height={400} layout='responsive'/>
            <h1>{props.title}</h1>
            <div dangerouslySetInnerHTML={props.displayHtml} />
            <center>
            <Image src="/img/Flame_icon.svg" height={50} width={50} />
            </center>
        </StyledContentContainer>
    </>
);

Post.getInitialProps = async ({query}) => {

    let pageProps = {};

    await fetch(`https://api.frc.org/api/webtext/${query.id}.json`)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                pageProps = result;
                pageProps.displayHtml = {
                    __html: `${pageProps.htmlText}`
                }
                // setIsLoaded(true);
                // setItems(result);
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

    return pageProps;
}

export default Post;