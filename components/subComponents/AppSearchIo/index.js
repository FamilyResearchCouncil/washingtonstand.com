import { Pipeline, SearchProvider, useSearch, useQuery } from '@sajari/react-hooks';
import { Combobox } from '@sajari/react-components';
import styled from "styled-components";
import React from "react";

const pipeline = new Pipeline(
    {
        account: '1535051769990227710',
        collection: 'frc-org',
    },
    'query',
);

const SearchWrapper = styled.div`
  margin-bottom: 4rem;
  
  div[role="combobox"] {
    background: transparent;
    border: none;
    border-radius: 0;
    max-width: 20rem;
    border-bottom: solid 1px ${({theme}) => theme.colors.primaryGrey};
    margin: 0 auto;
    
    > div:first-of-type {
      left: unset;
      right: 0;
    }
    
    input {
      padding-left: 0;
      padding-right: 4rem;
      color: ${({theme}) => theme.colors.primaryGrey};
    }
    
  }
`;

const SearchField = () => {
    const { results = [] } = useSearch();
    const { query, setQuery } = useQuery();

    return (
        <>
            <SearchWrapper>
                {/*<Combobox />*/}
                <Combobox onChange={(value) => {
                    setQuery(value)
                }} />
            </SearchWrapper>

            {query && results.length > 0 && (
                <ul className="list-disc px-5 space-y-2 mt-5">
                    {results.map(({ values: { name, id } }) => (
                        <li key={id}>{name}</li>
                    ))}
                </ul>
            )}
        </>
    );
}

const AppSearchIo = () => (
    <>
        <SearchProvider search={{ pipeline }}>
            <SearchField />
        </SearchProvider>
    </>
);

export default AppSearchIo;





// const AppSearchIo = () => (
//     <>
//         <SearchWrapper>
//         <div id={`nav-search-box`} />
//         </SearchWrapper>
//         <div id={`results-overlay`} />
//         <Script
//             id="sajariSearch"
//         >
//             var _sj = _sj || [];
//             _sj.push(['project', '1535051769990227710']);
//             _sj.push(['collection', 'washington-stand-com']);
//             (function () {
//             var sj = document.createElement('script');
//             sj.type = 'text/javascript';
//             sj.async = true;
//             sj.src = '//cdn.sajari.com/js/sj.js';
//             var s = document.getElementsByTagName('script')[0];
//             s.parentNode.insertBefore(sj, s);
//         })();
//
//             var getUrlParam = function(e){var t = new RegExp("[?&]" + e.replace(/[\[\]]/g, "\\$&") + "(=([^&##]*)|&|##|$)"),a = t.exec(window.location.href);return a && a[2] ? decodeURIComponent(a[2].replace(/\+/g, " ")) : ""};
//             var setup = function(w,d,x,a,e,s,c,r){s = [];var b=function(){s.push(arguments);},q="ui";b.arr=s;w[a]=w[a]||[];w[a][q]=w[a][q]||[];w[a][q].push(b);c=d.createElement(x);c.async=1;c.src=e;r=d.getElementsByTagName(x)[0];r.parentNode.insertBefore(c,r);return b;};
//
//             var searchInterface = setup(window, document, "script", "sajari", "//cdn.sajari.net/js/integrations/website-search-1.4.js");
//
//             searchInterface({
//             mode: "overlay",
//             project: "1535051769990227710", // Set this to your project.
//             collection: "washington-stand-com", // Set this to your collection.
//             pipeline: "website",     // Set the search pipeline.
//             instantPipeline: "autocomplete", // Set the instant pipeline.
//             attachOverlay: document.getElementById("results-overlay"), // DOM element to render search box.
//             inputPlaceholder: "Search", // Placeholder text for the search box.
//             inputAutoFocus: false, // Focus the input element on render.
//             maxSuggestions: 5, // Maximum number of suggestions to show.
//             results: {"showImages": false }, // Configure the results.
//             values: {"q.override": true, "resultsPerPage": "80","q": getUrlParam("q")}, // Set default values.
//             tabFilters: null, // User selectable filters
//             styling: { theme: { colors: { brand: { primary: "#003366" }}}}
//         });
//
//             var searchBox = setup(window, document, "script", "sajari", "//cdn.sajari.net/js/integrations/website-search-1.4.js");
//             searchBox({
//             mode: "search-box",
//             project: "1535051769990227710", // Set this to your project.
//             collection: "washington-stand-com", // Set this to your collection.
//             instantPipeline: "autocomplete", // Pipeline used as you type
//             inputPlaceholder: "Search", // Input element placeholder
//             maxSuggestions: 5, // Maximum number of suggestions to show
//             attachSearchBox: document.getElementById("nav-search-box") // DOM element to attach to
//         });
//
//             searchBox("sub", "pipeline.search-sent", function (_, query) {
//             searchInterface("pub", "overlay-show");
//             searchInterface("pub", "pipeline.values-set", { q: query.q });
//             searchInterface("pub", "instantPipeline.values-set", { q: query.q });
//             searchInterface("pub", "pipeline.search-send");
//         });
//         </Script>
//     </>
// );
