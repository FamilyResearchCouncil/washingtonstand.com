
export default async function serverSideCall(req, res) {

    // const baseUrl = `https://sheets.googleapis.com/v4/spreadsheets/1leK-43v3j6f7vUbQwEzO1C57Omygr6IHpJvykEOQd7Q/values/LaterTermAbortions?alt=json&key=${process.env.GOOGLE_API_KEY}`;
    const baseUrl = `https://sheets.googleapis.com/v4/spreadsheets/1leK-43v3j6f7vUbQwEzO1C57Omygr6IHpJvykEOQd7Q/values/LaterTermAbortions?alt=json&key=${process.env.GOOGLE_API_KEY}`;
    const response = await fetch (baseUrl).then(res => res.json()).then(response => {
        res.status(200).json({response
        }),
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
            res.status(500);
        }
    });

}