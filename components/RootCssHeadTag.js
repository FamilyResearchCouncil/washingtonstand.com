import Head from "next/head";
// import getRootCssFromJs from "js-to-root-css";

const cssStringFunction = (themeObject,parentAttribute="") => {
    let cssString = "";
    for (const attribute in themeObject) {
        cssString = (typeof themeObject[attribute] === "object") ? `${cssString} ${cssStringFunction(themeObject[attribute],`${parentAttribute}-${attribute}`)}` : `${cssString}--${parentAttribute}-${attribute}:${themeObject[attribute]};`
    }
    return cssString;
}

const getRootCssFromJs = (themeObject,parentAttribute="") => {
    return `:root {${cssStringFunction(themeObject,parentAttribute)}}`
}


// component takes the theme defined in Javascript for styled-components and generates CSS global variables
// that can then be used in any *.module.css files in order to maintain a single definition of the styles
// making them available in both CSS and JS files.

const RootCssHeadTag = (props) => {

    return (
       <Head>
           <style>
               {` ${getRootCssFromJs(props.theme,"theme")} `}
           </style>
       </Head>
    );
}

export default RootCssHeadTag;