import Head from "next/head";
import themeDetails from "./siteTheme";

const colorObject =  Object.entries(themeDetails().colors);

// by way of an explanation this component takes the theme defined in Javascript and generates
// CSS global variables that can then be used in any *.module.css files in order to maintain a
// single definition of the colors, thus keeping them from being hard codes in numerous places.

const RootCssHeadTag = () => (
    <Head>
        <style>
        {`
            :root {
            ${
                colorObject.reduce((updated, latest) => updated.concat(`--${latest[0]}: ${latest[1]};`), '')
            }}
        `}
        </style>
    </Head>
)

export default RootCssHeadTag;