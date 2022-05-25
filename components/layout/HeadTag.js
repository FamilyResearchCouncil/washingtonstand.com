import Head from "next/head";
import {decode} from 'html-entities';

const HeadTag = (props) => (
    <>
        <Head>
            <title>{decode(props.title)}</title>
            <meta name="description" content={props.description} />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    </>
);

export default HeadTag;