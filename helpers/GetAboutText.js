import isJson from "./DataVerifiers";

const GetAboutText = async() => {

    let returnData = {
        __html: ""
    }

    await fetch(`https://api.frc.org/api/webtext/WX22E08.cfm?trackDownload=0`)
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
           console.log(error);
        });

    return returnData
}

export default GetAboutText;