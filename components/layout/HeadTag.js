import Head from "next/head";
import {decode} from 'html-entities';
import {concatAuthorNames} from "../../helpers/DataManipulators";

const HeadTag = (props) => (
    <>
        <Head>
            <title>{decode(props.title)}</title>
            <meta name="description" content={props.description} />
            <link rel="icon" href="/favicon.ico" />

            {
                props.article ?
                    <>
                        <meta name="author" content={concatAuthorNames(props.article.authorDetailsArray)} />
                        <meta property="og:title" content={decode(props.title)} />
                        <meta property="og:description" content={props.article.SUMMARY_TEXT.slice(0,160)} />
                        <meta property="og:image" content={props.article.SCREENCAP_IMAGE} />
                        <meta property="og:url" content="http://www.frc.org/updatearticle/20220519/roe-rage"/>
                        <meta name="search_date" data-sj-field="search_date" content={props.article.START_DATE.slice(0,10)} />
                        <meta name="description" data-sj-field="description" content={props.article.SUMMARY_TEXT.slice(0,160)} />
                        <link rel="canonical" href={props.article.CANONICAL_URL} />
                    </>
                    : <></>
            }


        </Head>
    </>
);

export default HeadTag;