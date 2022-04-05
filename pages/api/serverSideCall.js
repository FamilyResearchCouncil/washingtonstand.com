
export default async function serverSideCall(req, res) {
    const {
        query: { firstName, lastName },
    } = req;

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