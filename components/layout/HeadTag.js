import Head from "next/head";

const HeadTag = (props) => (
    <>
        <Head>
            <title>{props.title}</title>
            <meta name="description" content={props.description} />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    </>
);

export default HeadTag;