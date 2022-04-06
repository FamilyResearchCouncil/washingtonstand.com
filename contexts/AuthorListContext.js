import React, { useContext, useState, createContext } from "react";

const APIContext = createContext();

function StaffContextProvider({ children }) {
    // Initialize state
    const [staff, setStaff] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    // Fetch data
    fetch("https://api.frc.org/api/webjson/frc/script-generated/news_author_details_array.json")
        .then(res => res.json())
        .then(
            (result) => {
                setStaff(result);
                setIsLoading(false);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log(error);
            }
        );

    return (
        <APIContext.Provider value={{ staff, isLoading }}>
            {children}
        </APIContext.Provider>
    );
}

// Create a hook to use the APIContext, this is a Kent C. Dodds pattern
export function useAPIStaff() {
    const context = useContext(APIContext);
    if (context === undefined) {
        throw new Error("Context must be used within a Provider");
    }
    return context;
}


export default StaffContextProvider;