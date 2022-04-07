import React, { useContext, useState, createContext } from "react";

const APIContext = createContext();

function PublicationContextProvider({ children }) {
    // Initialize state
    const [publications, setPublications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    // Fetch data
    // fetch("https://api.frc.org/api/webjson/frc/script-generated/item_listing_NA.json")
    //     .then(res => res.json())
    //     .then(
    //         (result) => {
    //             setPublications(result);
    //             setIsLoading(false);
    //         },
    //         // Note: it's important to handle errors here
    //         // instead of a catch() block so that we don't swallow
    //         // exceptions from actual bugs in components.
    //         (error) => {
    //             console.log(error);
    //         }
    //     );

    return (
        <APIContext.Provider value={{ publications, isLoading }}>
            {children}
        </APIContext.Provider>
    );
}

// Create a hook to use the APIContext, this is a Kent C. Dodds pattern
export function useAPIPubs() {
    const context = useContext(APIContext);
    if (context === undefined) {
        throw new Error("Context must be used within a Provider");
    }
    return context;
}


export default PublicationContextProvider;