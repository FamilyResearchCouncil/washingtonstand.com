import isJson from "./DataVerifiers";

/**
 * GetAboutText - fetches About Text HTML
 * @uses isJson to confirm that the response is not JSON
 * @returns {object}
 */

const GetAboutText = async() => {

    let returnData = {
        __html: ""
    }
    try {
        await fetch(`https://apiv2.frc.org/api/webtext/WX22E08.cfm?trackDownload=0`)
            .then(res => {
                return (res.ok) ? res.text() : Promise.resolve("");
            })
            .then((result) => {
                    returnData = {
                        __html: (isJson(result)) ? "" : result
                    };
                },
                (error) => {

                }
            ).catch((error) => {
                console.log("Error in GetAboutText",error);
            });
    } catch (e) {
       console.log("Error in GetAboutText",e);
    }
    return returnData
}

export default GetAboutText;