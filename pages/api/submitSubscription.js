import appUrls from "../../storage/baseUrls.json";
// all column names must be in lower case, or it will throw an error in the API, which take camelCase and
// changes it to snake_case for the sake of how database columns are defined.

export default async function submitSubscription(req, res) {
    if (req.method === 'POST') {
        console.log(req.body);

        let response = {
            success: true,
            data : {
                ...req.body,
                rid: '12403835'
            },
            error : null
        }

        console.log(response);

        res.status(200).json(response)
        // res.status(200).json(errorData)

        // res.status(200).json(req.body)

        // const apiAuthToken = await getAPIToken();
        //
        // const baseUrl = `https://api.frc.org/api/frc/new-accounts?confirmation=1`;
        // // const baseUrl = `https://api.frc.org/api/frc/new-accounts?confirmation=1&report_code=CE`;
        //
        // const headers = {
        //     'Content-Type' : 'application/json',
        //     'Authorization' : `${apiAuthToken.token_type} ${apiAuthToken.access_token}`
        // };

        // const data = {
        //         "forceNew":"Y",
        //         "rid":"",
        //         "personal_id":"",
        //         "load_date": "2022-04-08",
        //         "person_first_name":"Timothy",
        //         "person_last_name":"Daigle",
        //         "zip":"20001",
        //         "phone":"202-123-4567",
        //         "email_addr":"tdaigle@frc.org",
        //         "new_account_item":{
        //             "item_code":"WUSUB","qty_requested":1,"warehouse":"CIS"
        //         },
        //         "confirmation":
        //             {"rid":"WUSUB","qty_requested":1,"warehouse":"CIS"}
        //
        //     }

        // await fetch(baseUrl, {
        //     method: 'POST',
        //     headers: headers,
        //     body: JSON.stringify(req.body)
        // }).then(res => {
        //     console.log(res);
        //     return res.json()
        // }).then(response => {
        //     console.log(response);
        //     res.status(200).json(response)
        // });
    } else {
        res.status(405).json({
            status: "error",
            reason: "Not allowed",
            message: "POST method is required"
        });
    }
}


const getAPIToken  = async (req, res) => {

    let apiToken = {};

    const data = {
        "client_id": `${process.env.FRC_API_CLIENT_ID}`,
        "client_secret": `${process.env.FRC_API_CLIENT_SECRET}`,
        "grant_type": "client_credentials"
    }

    const headers = { 'Content-Type' : 'application/json' };

    const baseUrl = `https://api.frc.org/oauth/token`;
    await fetch(baseUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    }).then(response => {
        apiToken = response;
    });

    return apiToken;
}

// $request_data = [
//     '{"forceNew":"Y","rid":"' . $ids[1] . '","personal_id":"","status_code":"NA_NEW","account_type":"PER","account_source":"MENC","person_salutation":"MR","person_first_name":"","person_familiar":"Aaron","person_last_name":"Potter","addr_1":"1 Innovation Way Ste B","addr_2":"","city":"Woodland Park","state":"CO","zip":"80863","phone":"","phone_address_type":"","email_addr":"","person_birth_date":"","person_gender":"","user_id":"SEK","church_name":"","new_account_attendees":{"attendee_type":"V","event_code":"MC018","attendee_comment":"Volunteer Event Team - Complimentary"},"new_account_gifts":{"appeal_code":"21MC1F","gift_type":"A","card_number":"","exp_date":"","cid":"","gift_amount":"0"}}',
//     '{"forceNew":"Y","rid":"' . $ids[2] . '","personal_id":"5575670","status_code":"NA_NEW","account_type":"PER","account_source":"MENC","person_salutation":"CPN","person_first_name":"Mike","person_familiar":"Mike","person_last_name":"Landers","addr_1":"5590 Alma Ter","addr_2":"","city":"Colorado Springs","state":"CO","zip":"80917","phone":"949-241-0813","phone_address_type":"M","email_addr":"landersmike@hotmail.com","person_birth_date":"","person_gender":"","user_id":"ANB","church_name":"","new_account_attendees":{"attendee_type":"R","event_code":"MC018","attendee_comment":"$49.00 Declined Credit Card Payment"},"new_account_gifts":{"appeal_code":"21MC1F","gift_type":"R","card_number":"4100 3901 8242 7001","exp_date":"05/24","cid":"577","gift_amount":"49"}}',
//     '{"forceNew":"Y","rid":"' . $ids[3] . '","personal_id":"","status_code":"NA_EXC","account_type":"PER","account_source":"","person_salutation":"MR","person_first_name":"John","person_familiar":"Matt","person_last_name":"Brown","addr_1":"27121 Coyote Ridge Ln","addr_2":"","city":"Johnstown","state":"CO","zip":"80534","phone":"970-744-5783","phone_address_type":"M","email_addr":"mattdocbrown@gmail.com","person_birth_date":"","person_gender":"","user_id":"JAG","church_name":"","new_account_attendees":{"attendee_type":"R","event_code":"MC018","attendee_comment":"Reprint name tag ~ printed wrong name"},"new_account_gifts":{"appeal_code":"21MC1F","gift_type":"R","card_number":"4147 2023 0305 4223","exp_date":"1223","cid":"501","gift_amount":"60"}}',
//     '{"forceNew":"Y","rid":"' . $ids[4] . '","personal_id":"","status_code":"NA_NEW","account_type":"PER","account_source":"MENC","person_salutation":"MR","person_first_name":"John","person_familiar":"Matt","person_last_name":"Brown","addr_1":"27121 Coyote Ridge Ln","addr_2":"","city":"Johnstown","state":"CO","zip":"80534","phone":"970-744-5783","phone_address_type":"M","email_addr":"mattdocbrown@gmail.com","person_birth_date":"","person_gender":"","user_id":"JNW","church_name":"","new_account_attendees":{"attendee_type":"R","event_code":"MC018","attendee_comment":"$Reprint name tag…printed wrong name"},"new_account_gifts":{"appeal_code":"21MC1F","gift_type":"R","card_number":"1234 5678 9000 0000","exp_date":"12/23","cid":"501","gift_amount":"60"}}'
// ];

let errorData =
    {
        success: false,
        data: {
            forceNew: 'Y',
            RID: null,
            PERSONAL_ID: null,
            STATUS_CODE: 'NA_EXC',
            ACCOUNT_TYPE: 'PER',
            ACCOUNT_SOURCE: 'WEB',
            PERSON_SALUTATION: 'MR',
            PERSON_FIRST_NAME: 'Timothy',
            PERSON_LAST_NAME: 'Daigle',
            ADDR_1: '801 G Street NW',
            ADDR_2: null,
            CITY: 'Washington',
            STATE: 'DC',
            ZIP: '20001',
            PHONE: '202-123-4567',
            EMAIL_ADDR: 'tdaigle@frc.org',
            USER_ID: 'WEB',
            NEW_ACCOUNT_ITEMS: '{"ITEM_CODE":"WUSUB","SEND_CODE":"EM","QTY_REQUESTED":1,"WAREHOUSE":"CIS","REQUESTED_FLAG":"Y"}'
        },
        error: 'Error Code    : 957\n' +
            'Error Message : ORA-00957: duplicate column name\n' +
            'Position      : 344\n' +
            'Statement     : update "FRC"."NEW_ACCOUNTS" set "STATUS_CODE" = :p0, "ACCOUNT_TYPE" = :p1, "ACCOUNT_SOURCE" = :p2, "PERSON_SALUTATION" = :p3, "PERSON_FIRST_NAME" = :p4, "PERSON_LAST_NAME" = :p5, "ADDR_1" = :p6, "CITY" = :p7, "STATE" = :p8, "ZIP" = :p9, "PHONE" = :p10, "EMAIL_ADDR" = :p11, "USER_ID" = :p12, "NEW_ACCOUNT_ITEMS" = :p13, "ACTIVITY_DATE" = :p14, "USER_ID" = :p15 where "RID" = :p16\n' +
            'Bindings      : [NA_EXC,PER,WEB,MR,Timothy,Daigle,801 G Street NW,Washington,DC,20001,202-123-4567,tdaigle@frc.org,WEB,{"ITEM_CODE":"WUSUB","SEND_CODE":"EM","QTY_REQUESTED":1,"WAREHOUSE":"CIS","REQUESTED_FLAG":"Y"},2022-04-07 17:35:35,API,12403085]\n' +
            ' (SQL: update "FRC"."NEW_ACCOUNTS" set "STATUS_CODE" = NA_EXC, "ACCOUNT_TYPE" = PER, "ACCOUNT_SOURCE" = WEB, "PERSON_SALUTATION" = MR, "PERSON_FIRST_NAME" = Timothy, "PERSON_LAST_NAME" = Daigle, "ADDR_1" = 801 G Street NW, "CITY" = Washington, "STATE" = DC, "ZIP" = 20001, "PHONE" = 202-123-4567, "EMAIL_ADDR" = tdaigle@frc.org, "USER_ID" = WEB, "NEW_ACCOUNT_ITEMS" = {"ITEM_CODE":"WUSUB","SEND_CODE":"EM","QTY_REQUESTED":1,"WAREHOUSE":"CIS","REQUESTED_FLAG":"Y"}, "ACTIVITY_DATE" = 2022-04-07 17:35:35, "USER_ID" = API where "RID" = 12403085)'
}

let sucessData =
    {
        success: true,
        data: {
         rid: '12403835',
         status_code: 'NA_NEW',
         batch_no: null,
         load_date: '1900-01-01T05:32:11.000000Z',
         add_account: null,
         account_id: null,
         account_name: null,
         account_type: 'PER',
         account_source: 'WEB',
         website_url: null,
         external_uid: null,
         exact_match_flag: null,
         hostile_flag: null,
         add_person: null,
         personal_id: null,
         function_code: 'SLF',
         person_salutation: null,
         person_first_name: 'Timothy',
         person_middle_name: null,
         person_last_name: 'Daigle',
         person_suffix: null,
         person_familiar: null,
         person_title: null,
         add_address: 'Y',
         addr_seq_no: null,
         address_type: 'H',
         cass_certified_flag: null,
         addr_1: null,
         addr_2: null,
         addr_3: null,
         city: null,
         state: null,
         zip: '20001',
         district_no: null,
         country: null,
         add_phone: 'Y',
         phone_seq_no: null,
         phone: '202-123-4567',
         add_fax: null,
         fax_seq_no: null,
         fax: null,
         add_email: 'Y',
         email_seq_no: null,
         email_addr: 'tdaigle@frc.org',
         format_code: null,
         ip_address: null,
         user_id: 'API',
         activity_date: '2022-04-08T14:53:07.000000Z',
         person_gender: null,
         school_name: null,
         password_text: null,
         item_code: null,
         church_name: null,
         year_earned: null,
         person_birth_date: '1900-01-01T05:32:11.000000Z',
         phone_address_type: null,
         cass_certify_type: null,
         occupation_code: null,
         employer: null,
         church_membership: null,
         autoprocess_flag: null,
         autoprocess_code: null,
         twitter_handle: null,
         employer_address: null,
         add_mobile: null,
         mobile_seq_no: null,
         mobile: null,
         attendee_person: null,
         new_account_attendee: null,
         new_account_gift: null
       },
   error: null
 }
