import React, { useContext, useState, useEffect, createContext } from "react";

const APIContext = createContext();

function APIContextProvider({ children }) {
    // Initialize state
    const [publications, setPublications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    // Fetch data
    // useEffect(() => {
    fetch("https://api.frc.org/api/webjson/frc/script-generated/item_listing_NA.json")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setPublications(result);
                    setIsLoading(false);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error);
                }
            );
    // }, []);

    return (
        <APIContext.Provider value={{ publications, isLoading }}>
            {children}
        </APIContext.Provider>
    );
}

// Create a hook to use the APIContext, this is a Kent C. Dodds pattern
export function useAPI() {
    const context = useContext(APIContext);
    if (context === undefined) {
        throw new Error("Context must be used within a Provider");
    }
    return context;
}


export default APIContextProvider;







// export default function publicationList() {
//     return {
//         colors: {
//             primaryBlue: '#003366',
//             altDarkBlue: '#0c1527',
//             altLightBlue: '#6c97c6',
//             primaryGold: '#ddbb2b',
//             isWhite: '#ffffff',
//             transparentBlack: 'rgba(0,0,0,.7)',
//             mobileTransparentblack: 'rgba(0,0,0,.85)',
//         },
//         widths: {
//             xlargeMaxWidth: '1100px',
//             largeMaxWidth: '800px',
//             mediumMaxWidth: '600px',
//             contentList: '800px',
//             mobileMenu: '576px',
//             readingWidth: '80ch'
//         },
//         padding: {
//             sectionPadding: '4rem 2rem'
//         },
//         breakPoints: {
//             small: '480px',
//             medium: '768px',
//             large: '992px',
//             xLarge: '1200px'
//         },
//         directories: {
//             news: 'news'
//         }
//     }
// }




// {
//     fetch("https://api.frc.org/api/webjson/frc/script-generated/item_listing_NA.json")
//         .then(res => res.json())
//         .then(
//             (result) => {
//                 return result;
//             },
//             // Note: it's important to handle errors here
//             // instead of a catch() block so that we don't swallow
//             // exceptions from actual bugs in components.
//             (error) => {
//
//             }
//         )
// }
//