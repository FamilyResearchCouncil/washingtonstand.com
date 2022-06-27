import React, {useEffect} from "react";
import Layout from "../components/layout/mainLayout"
import {ThemeProvider} from 'styled-components'
import { useRouter } from 'next/router'
import theme from '../components/siteTheme'
import RootCssHeadTag from "../components/RootCssHeadTag";
import Script from "next/script";
import '../styles/globals.css'


import * as gtag from "../lib/ga";

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
                <Script
                    strategy="lazyOnload"
                    src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
                    referrerPolicy="no-referrer-when-downgrade"
                    // crossOrigin={`anonymous`}
                />
                <Script
                    strategy="lazyOnload"
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
            <Script
                strategy="lazyOnload"
                src={`//cf.journity.com/collector/washingtonstand.com.js`}
            />
            <link href="//cf.journity.com/personalizer/washingtonstand.com.css" rel="stylesheet" />
            <Script
                strategy="lazyOnload"
                src={`//cf.journity.com/personalizer/washingtonstand.com.min.js`}
            />
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    );
}