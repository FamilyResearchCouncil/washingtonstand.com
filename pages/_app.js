import React from "react";
import Layout from "../components/layout/mainLayout"
import {ThemeProvider} from 'styled-components'
import PublicationContextProvider from "../contexts/PublicationListContext";
import StaffContextProvider from "../contexts/AuthorListContext";
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import theme from '../components/siteTheme'
import RootCssHeadTag from "../components/RootCssHeadTag";
import Head from "next/head";
import '../styles/globals.css'

// log the pageview with their URL
const pageview = (url) => {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        page_path: url,
    })
}

export default function MyApp({ Component, pageProps }) {
    const router = useRouter()
    useEffect(() => {
        const handleRouteChange = (url) => {
            pageview(url)
        }
        //When the component is mounted, subscribe to router changes
        //and log those page views
        router.events.on('routeChangeComplete', handleRouteChange)

        // If the component is unmounted, unsubscribe
        // from the event with the `off` method
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])

    const getLayout = Component.getLayout || ((page) => page);

    return getLayout(
        <ThemeProvider theme={theme}>
            <RootCssHeadTag theme={(theme)()}/>
            <Head>
                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                          page_path: window.location.pathname,
                        });
                      `,
                    }}
                />
            </Head>
            <PublicationContextProvider>
            <StaffContextProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </StaffContextProvider>
            </PublicationContextProvider>
        </ThemeProvider>
    );
}