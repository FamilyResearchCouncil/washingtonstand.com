import Head from "next/head";
// import getRootCssFromJs from "js-to-root-css";

// component takes the theme defined in Javascript for styled-components and generates CSS global variables
// that can then be used in any *.module.css files in order to maintain a single definition of the styles
// making them available in both CSS and JS files.

const RootCssHeadTag = (props) => {

    const getCssString = (themeObject) => {
        let cssString = "";
        for (const attribute in themeObject) {
            cssString = (typeof themeObject[attribute] === "object") ? `${cssString} ${getCssString(themeObject[attribute])}` : `${cssString}--${attribute}:${themeObject[attribute]};`
        }
        return cssString;
    }

    const rootCssVariables = getCssString(props.theme);
    return (
       <Head>
           <style>
               {`
               :root {
               ${
                   rootCssVariables
               }
               }
           `}
           </style>
       </Head>
    );
}

export default RootCssHeadTag;