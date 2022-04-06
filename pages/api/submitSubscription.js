
export default async function submitSubscription(req, res) {
    if (req.method === 'POST') {
        // ${process.env.GOOGLE_API_KEY};
        const headers = {
            "client_id-type": `${process.env.FRC_API_CLIENT_ID}`,
            "client_secret": `${process.env.FRC_API_CLIENT_SECRET}`,
            "grant_type": "client_credentials"
        }

        //     [
        //     ["client_id", `${process.env.FRC_API_CLIENT_ID}`],
        //     ["client_secret", `${process.env.FRC_API_CLIENT_SECRET}`],
        //     ["grant_type", "client_credentials"]
        // ]
        const OAuthHeaders = new Headers(headers);
        console.log(headers);
        const baseUrl = `https://api.frc.org/oauth/token`;
        const response = await fetch(baseUrl, {
            method: 'POST',
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: new Headers(headers),
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            //body: JSON.stringify(data) // body data type must match "Content-Type" header
        }).then(res => res.json()).then(response => {
            res.status(200).json({response})
        });
    } else {
        res.status(405).json({ message: "POST method is required" });
    }
}



// parses JSON res into native JavaScript objects

// $request = Http::baseUrl('https://api.frc.org');
//
// $res = $request->post('/oauth/token', [
//     'client_id' => env('API_FRC_ORG_CLIENT_ID'),
//     'client_secret' => env('API_FRC_ORG_CLIENT_SECRET'),
//     'grant_type' => 'client_credentials'
// ]);
// dump($res->status(),$res->json());
//
// $res = $request->withToken($res->json('access_token'))
// ->post("/api/freshaddress/verify?email=eab@frc.org");
// dd($res->status(),$res->json());


// res.status(200).json({ title: 'POST testing', status: "good" });