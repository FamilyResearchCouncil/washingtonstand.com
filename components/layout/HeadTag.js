import Head from "next/head";
import {decode} from 'html-entities';
import {concatAuthorNames} from "../../helpers/DataManipulators";

const HeadTag = (props) => (
    <>
        <Head>
            <title>{decode(props.title)}</title>
            <meta name="description" data-sj-field="description" content={props.description} />
            <link rel="icon" href="/favicon.ico" />
            {
                props.article ?
                    <>
                        <meta name="author" content={concatAuthorNames(props.article.authorDetailsArray)} />
                        <meta property="og:title" content={decode(props.title)} />
                        <meta property="og:description" content={props.article.SUMMARY_TEXT.slice(0,160)} />
                        <meta property="og:image" content={props.article.SCREENCAP_IMAGE} />
                        <meta property="og:url" content={props.article.CANONICAL_URL}/>
                        <meta property="article:published_time" content={props.article.START_DATE.slice(0,10)} />
                        <meta name="date" content={props.article.START_DATE.slice(0,10)} />
                        <meta name="description" data-sj-field="description" content={props.article.SUMMARY_TEXT.slice(0,160)} />
                        <link rel="canonical" href={props.article.CANONICAL_URL} />
                    </>
                    : <></>
            }
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:site" content="@WSHStand" />

        </Head>
    </>
);

export default HeadTag;