
export default async function submitSubscription(req, res) {
    if (req.method === 'POST') {

        const data = [
            ["client_id", `${process.env.FRC_API_CLIENT_ID}`],
            ["client_secret", `${process.env.FRC_API_CLIENT_SECRET}`],
            ["grant_type", "client_credentials"]
        ]

        const baseUrl = `https://api.frc.org/oauth/token`;
        await fetch(baseUrl, {
            method: 'POST',
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }).then(res => {
            console.log(res);
            return res.json();
            })
            .then(response => {
            console.log(response);
            res.status(200).json({response})
        });
    } else {
        res.status(405).json({ message: "POST method is required" });
    }
}


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