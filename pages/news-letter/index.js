import {StyledReadingSection} from "../../components/subComponents/ReadingTextBlock";
import React from "react";



// fetch("/api/submitSubscription", {
//     method: 'POST',
// })
//     .then(res => res.json())
//     .then(
//         (result) => {
//             thePostData = result;
//         },
//         // Note: it's important to handle errors here
//         // instead of a catch() block so that we don't swallow
//         // exceptions from actual bugs in components.
//         (error) => {
//             console.log(error);
//         }
//     );



const NewsLetterForm = () => {
    const registerSubscription = async event => {
        event.preventDefault() // don't redirect the page
        // where we'll add our form logic

        const res = await fetch("/api/submitSubscription", {
            body: JSON.stringify({
                person_first_name: event.target.person_first_name.value,
                person_last_name: event.target.person_last_name.value,
                email_addr: event.target.email_addr.value,
                zip: event.target.zip.value
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })

        const result = await res.json()

        console.log(result);

        return result;

    }


    return (
        <>
            <StyledReadingSection>
        <form onSubmit={registerSubscription}>
            <div>
                <label htmlFor="person_first_name">First Name</label><br/>
                <input id="person_first_name" type="text" autoComplete="person_first_name" required />
            </div>
            <div>
                <label htmlFor="person_last_name">Last Name</label><br/>
                <input id="person_last_name" type="text" autoComplete="person_last_name" required />
            </div>
            <div>
                <label htmlFor="email_addr">Email</label><br/>
                <input id="email_addr" type="text" autoComplete="email_addr" required />
            </div>
            <div>
                <label htmlFor="zip">Zip Code</label><br/>
                <input id="zip" type="text" autoComplete="zip" required />
            </div>
            <button type="submit">Submit</button>
        </form>
            </StyledReadingSection>
        </>
    )
};

export default NewsLetterForm;