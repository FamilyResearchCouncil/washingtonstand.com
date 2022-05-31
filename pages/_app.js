import React, {useEffect} from "react";
import Layout from "../components/layout/mainLayout"
import {ThemeProvider} from 'styled-components'
import { useRouter } from 'next/router'
import theme from '../components/siteTheme'
import RootCssHeadTag from "../components/RootCssHeadTag";
import Head from "next/head";
import Script from "next/script";
import '../styles/globals.css'
import { NextResponse } from 'next/server'


import * as gtag from "../lib/ga";

// log the pageview with their URL
// const pageview = (url) => {
//     window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
//         page_path: url,
//     })
// }

export default function MyApp({ Component, pageProps }) {

    const router = useRouter();
    useEffect(() => {
        const handleRouteChange = (url) => {
            gtag.pageview(url);
        };
        router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);
    const getLayout = Component.getLayout || ((page) => page);

    return getLayout(
        <ThemeProvider theme={theme}>
            <RootCssHeadTag theme={(theme)()}/>
            <>
                {/* Global Site Tag (gtag.js) - Google Analytics */}
                <Script
                    strategy="afterInteractive"
                    src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
                />
                <Script
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${gtag.GA_TRACKING_ID}', {
                              page_path: window.location.pathname,
                            });
                        `,
                    }}
                />
            </>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
        </ThemeProvider>
    );
}