import Head from "next/head";
import {decode} from 'html-entities';

const HeadTag = (props) => (
    <>
        <Head>
            <title>{decode(props.title)}</title>
            <meta name="description" content={props.description} />
            <link rel="icon" href="/favicon.ico" />

            <meta name="search_date" data-sj-field="search_date" content="2022-05-19" />
            <meta name="description" data-sj-field="description" content="Missing the days of 2020, when angry mobs were fixtures on America's streets? If you're nostalgic for the arson, destruction, and looting, abortion activists are promising more of it. Back by unpopular demand, the Left's riots are set to return once the final Supreme Court ruling on &lt;em&gt;Roe&lt;/em&gt; is handed down. &quot;This will be a Summer of Rage across America,&quot; the Women's March vowed after last weekend's protests. &quot;We will be ungovernable,&quot; the radicals threatened, until the violence they bring to our cities can be replicated in every mother's womb." />
            {/*<link rel="canonical" href="https://www.frc.org/updatearticle/20220519/roe-rage">*/}

            {/*
            <meta name="author" content="Suzanne Bowdey" />
            <meta name="twitter:card" content="" />
            <meta property="og:title" content="" />
            <meta property="og:description" content="Missing the days of 2020, when angry mobs were fixtures on America's streets? If you're nostalgic for the arson, " />
            <meta property="og:image" content="https://www.frcblog.com/media/filer/2022/05/19/march.png" />
            <meta property="og:url" content="http://www.frc.org/updatearticle/20220519/roe-rage"/>
            <meta property="og:site_name" content="FRC" />
            <meta property="twitter:site" content="@FRCdc" />
            */}
        </Head>
    </>
);

export default HeadTag;