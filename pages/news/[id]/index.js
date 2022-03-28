import HeadTag from "../../../components/layout/HeadTag";

const Post = (props) => (
    <>
        <HeadTag title="Publication" description="A Summary"  />
        <h1>{props.title}</h1>
        <div dangerouslySetInnerHTML={props} />
        {/*<div>{props.__html}</div>*/}
    </>
);

Post.getInitialProps = async ({query}) => {

    const pageProps = {title: "An Article"}

    pageProps.__html = (await (await fetch(`https://api.frc.org/api/webtext/${query.id}.cfm`)).text());

    return pageProps;
}

export default Post;