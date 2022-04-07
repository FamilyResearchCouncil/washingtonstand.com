
export default async function submitSubscription(req, res) {
    if (req.method === 'POST') {
        const data = {
            "client_id": `${process.env.FRC_API_CLIENT_ID}`,
            "client_secret": `${process.env.FRC_API_CLIENT_SECRET}`,
            "grant_type": "client_credentials"
        }

        const headers = { 'Content-Type' : 'application/json' };
        const authorize = { 'Authorization' : 'Bearer SLKJSLDKFJALKJDLKJL;FKJAL;DFKJLSDJFLS' };
        //var myHeaders = new Headers(httpHeaders);

        const baseUrl = `https://api.frc.org/oauth/token`;
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }).then(res => {
            console.log(res);
            return res.json()
        }).then(response => {
            console.log(response);
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

// $request_data = [
//     '{"forceNew":"Y","rid":"' . $ids[1] . '","personal_id":"","status_code":"NA_NEW","account_type":"PER","account_source":"MENC","person_salutation":"MR","person_first_name":"","person_familiar":"Aaron","person_last_name":"Potter","addr_1":"1 Innovation Way Ste B","addr_2":"","city":"Woodland Park","state":"CO","zip":"80863","phone":"","phone_address_type":"","email_addr":"","person_birth_date":"","person_gender":"","user_id":"SEK","church_name":"","new_account_attendees":{"attendee_type":"V","event_code":"MC018","attendee_comment":"Volunteer Event Team - Complimentary"},"new_account_gifts":{"appeal_code":"21MC1F","gift_type":"A","card_number":"","exp_date":"","cid":"","gift_amount":"0"}}',
//     '{"forceNew":"Y","rid":"' . $ids[2] . '","personal_id":"5575670","status_code":"NA_NEW","account_type":"PER","account_source":"MENC","person_salutation":"CPN","person_first_name":"Mike","person_familiar":"Mike","person_last_name":"Landers","addr_1":"5590 Alma Ter","addr_2":"","city":"Colorado Springs","state":"CO","zip":"80917","phone":"949-241-0813","phone_address_type":"M","email_addr":"landersmike@hotmail.com","person_birth_date":"","person_gender":"","user_id":"ANB","church_name":"","new_account_attendees":{"attendee_type":"R","event_code":"MC018","attendee_comment":"$49.00 Declined Credit Card Payment"},"new_account_gifts":{"appeal_code":"21MC1F","gift_type":"R","card_number":"4100 3901 8242 7001","exp_date":"05/24","cid":"577","gift_amount":"49"}}',
//     '{"forceNew":"Y","rid":"' . $ids[3] . '","personal_id":"","status_code":"NA_EXC","account_type":"PER","account_source":"","person_salutation":"MR","person_first_name":"John","person_familiar":"Matt","person_last_name":"Brown","addr_1":"27121 Coyote Ridge Ln","addr_2":"","city":"Johnstown","state":"CO","zip":"80534","phone":"970-744-5783","phone_address_type":"M","email_addr":"mattdocbrown@gmail.com","person_birth_date":"","person_gender":"","user_id":"JAG","church_name":"","new_account_attendees":{"attendee_type":"R","event_code":"MC018","attendee_comment":"Reprint name tag ~ printed wrong name"},"new_account_gifts":{"appeal_code":"21MC1F","gift_type":"R","card_number":"4147 2023 0305 4223","exp_date":"1223","cid":"501","gift_amount":"60"}}',
//     '{"forceNew":"Y","rid":"' . $ids[4] . '","personal_id":"","status_code":"NA_NEW","account_type":"PER","account_source":"MENC","person_salutation":"MR","person_first_name":"John","person_familiar":"Matt","person_last_name":"Brown","addr_1":"27121 Coyote Ridge Ln","addr_2":"","city":"Johnstown","state":"CO","zip":"80534","phone":"970-744-5783","phone_address_type":"M","email_addr":"mattdocbrown@gmail.com","person_birth_date":"","person_gender":"","user_id":"JNW","church_name":"","new_account_attendees":{"attendee_type":"R","event_code":"MC018","attendee_comment":"$Reprint name tag…printed wrong name"},"new_account_gifts":{"appeal_code":"21MC1F","gift_type":"R","card_number":"1234 5678 9000 0000","exp_date":"12/23","cid":"501","gift_amount":"60"}}'
// ];