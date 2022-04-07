import appUrls from "../../storage/baseUrls.json";

export default async function submitSubscription(req, res) {
    if (req.method === 'POST') {

        const apiAuthToken = await getAPIToken();

        const baseUrl = `https://api.frc.org/api/frc/new-accounts`;

        const headers = {
            'Content-Type' : 'application/json',
            'Authorization' : `${apiAuthToken.token_type} ${apiAuthToken.access_token}`
        };

        const data = {
                "forceNew":"Y",
                "RID":"",
                "PERSONAL_ID":"",
                // "STATUS_CODE":"NA_EXC",
                // "ACCOUNT_TYPE":"PER",
                // "ACCOUNT_SOURCE":"WEB",
                "PERSON_FIRST_NAME":"Timothy",
                "PERSON_LAST_NAME":"Daigle",
                // "ADDR_1":"801 G Street NW",
                // "CITY":"Washington",
                // "STATE":"DC",
                "ZIP":"20001",
                "PHONE":"202-123-4567",
                "EMAIL_ADDR":"tdaigle@frc.org",
                "NEW_ACCOUNT_ITEMS":JSON.stringify(
                    {"ITEM_CODE":"WUSUB","QTY_REQUESTED":1,"WAREHOUSE":"CIS"}
                    // {"ITEM_CODE":"WUSUB","SEND_CODE":"EM","QTY_REQUESTED":1,"WAREHOUSE":"CIS","REQUESTED_FLAG":"Y"}
                )
            }


        // let form_data = new FormData();
        //
        // for ( let key in data ) {
        //     form_data.append(key, data[key]);
        // }

        await fetch(baseUrl, {
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
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(res => {
        return res.json()
    }).then(response => {
        apiToken = response;
    });


    // const authorizeHeader = { 'Authorization' : 'Bearer SLKJSLDKFJALKJDLKJL;FKJAL;DFKJLSDJFLS' };

    return apiToken;
}


// res.status(200).json({ title: 'POST testing', status: "good" });

// $request_data = [
//     '{"forceNew":"Y","rid":"' . $ids[1] . '","personal_id":"","status_code":"NA_NEW","account_type":"PER","account_source":"MENC","person_salutation":"MR","person_first_name":"","person_familiar":"Aaron","person_last_name":"Potter","addr_1":"1 Innovation Way Ste B","addr_2":"","city":"Woodland Park","state":"CO","zip":"80863","phone":"","phone_address_type":"","email_addr":"","person_birth_date":"","person_gender":"","user_id":"SEK","church_name":"","new_account_attendees":{"attendee_type":"V","event_code":"MC018","attendee_comment":"Volunteer Event Team - Complimentary"},"new_account_gifts":{"appeal_code":"21MC1F","gift_type":"A","card_number":"","exp_date":"","cid":"","gift_amount":"0"}}',
//     '{"forceNew":"Y","rid":"' . $ids[2] . '","personal_id":"5575670","status_code":"NA_NEW","account_type":"PER","account_source":"MENC","person_salutation":"CPN","person_first_name":"Mike","person_familiar":"Mike","person_last_name":"Landers","addr_1":"5590 Alma Ter","addr_2":"","city":"Colorado Springs","state":"CO","zip":"80917","phone":"949-241-0813","phone_address_type":"M","email_addr":"landersmike@hotmail.com","person_birth_date":"","person_gender":"","user_id":"ANB","church_name":"","new_account_attendees":{"attendee_type":"R","event_code":"MC018","attendee_comment":"$49.00 Declined Credit Card Payment"},"new_account_gifts":{"appeal_code":"21MC1F","gift_type":"R","card_number":"4100 3901 8242 7001","exp_date":"05/24","cid":"577","gift_amount":"49"}}',
//     '{"forceNew":"Y","rid":"' . $ids[3] . '","personal_id":"","status_code":"NA_EXC","account_type":"PER","account_source":"","person_salutation":"MR","person_first_name":"John","person_familiar":"Matt","person_last_name":"Brown","addr_1":"27121 Coyote Ridge Ln","addr_2":"","city":"Johnstown","state":"CO","zip":"80534","phone":"970-744-5783","phone_address_type":"M","email_addr":"mattdocbrown@gmail.com","person_birth_date":"","person_gender":"","user_id":"JAG","church_name":"","new_account_attendees":{"attendee_type":"R","event_code":"MC018","attendee_comment":"Reprint name tag ~ printed wrong name"},"new_account_gifts":{"appeal_code":"21MC1F","gift_type":"R","card_number":"4147 2023 0305 4223","exp_date":"1223","cid":"501","gift_amount":"60"}}',
//     '{"forceNew":"Y","rid":"' . $ids[4] . '","personal_id":"","status_code":"NA_NEW","account_type":"PER","account_source":"MENC","person_salutation":"MR","person_first_name":"John","person_familiar":"Matt","person_last_name":"Brown","addr_1":"27121 Coyote Ridge Ln","addr_2":"","city":"Johnstown","state":"CO","zip":"80534","phone":"970-744-5783","phone_address_type":"M","email_addr":"mattdocbrown@gmail.com","person_birth_date":"","person_gender":"","user_id":"JNW","church_name":"","new_account_attendees":{"attendee_type":"R","event_code":"MC018","attendee_comment":"$Reprint name tag…printed wrong name"},"new_account_gifts":{"appeal_code":"21MC1F","gift_type":"R","card_number":"1234 5678 9000 0000","exp_date":"12/23","cid":"501","gift_amount":"60"}}'
// ];

let data957 =
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

let data904 =
    {
          success: false,
  data: {
        forceNew: 'Y',
        RID: null,
        PERSONAL_ID: null,
        PERSON_FIRST_NAME: 'Timothy',
        PERSON_LAST_NAME: 'Daigle',
        ZIP: '20001',
        PHONE: '202-123-4567',
        EMAIL_ADDR: 'tdaigle@frc.org',
        NEW_ACCOUNT_ITEMS: '{"ITEM_CODE":"WUSUB","QTY_REQUESTED":1,"WAREHOUSE":"CIS"}'
      },
  error: 'Error Code    : 904\n' +
    'Error Message : ORA-00904: "NEW_ACCOUNT_ITEMS": invalid identifier\n' +
    'Position      : 133\n' +
    'Statement     : update "FRC"."NEW_ACCOUNTS" set "PERSON_FIRST_NAME" = :p0, "PERSON_LAST_NAME" = :p1, "ZIP" = :p2, "PHONE" = :p3, "EMAIL_ADDR" = :p4, "NEW_ACCOUNT_ITEMS" = :p5, "ACTIVITY_DATE" = :p6, "USER_ID" = :p7 where "RID" = :p8\n' +
    'Bindings      : [Timothy,Daigle,20001,202-123-4567,tdaigle@frc.org,{"ITEM_CODE":"WUSUB","QTY_REQUESTED":1,"WAREHOUSE":"CIS"},2022-04-07 17:56:34,API,12403106]\n' +
    ' (SQL: update "FRC"."NEW_ACCOUNTS" set "PERSON_FIRST_NAME" = Timothy, "PERSON_LAST_NAME" = Daigle, "ZIP" = 20001, "PHONE" = 202-123-4567, "EMAIL_ADDR" = tdaigle@frc.org, "NEW_ACCOUNT_ITEMS" = {"ITEM_CODE":"WUSUB","QTY_REQUESTED":1,"WAREHOUSE":"CIS"}, "ACTIVITY_DATE" = 2022-04-07 17:56:34, "USER_ID" = API where "RID" = 12403106)'
}




// UPPER CASE
// {
//     "forceNew":"Y",
//     "RID":"",
//     "PERSONAL_ID":"",
//     "STATUS_CODE":"NA_EXC",
//     "ACCOUNT_TYPE":"PER",
//     "ACCOUNT_SOURCE":"WEB",
//     "PERSON_SALUTATION":"MR",
//     "PERSON_FIRST_NAME":"Timothy",
//     "PERSON_LAST_NAME":"Daigle",
//     "ADDR_1":"801 G Street NW",
//     "ADDR_2":"",
//     "CITY":"Washington",
//     "STATE":"DC",
//     "ZIP":"20001",
//     "PHONE":"202-123-4567",
//     "EMAIL_ADDR":"tdaigle@frc.org",
//     "USER_ID":"WEB",
//     "NEW_ACCOUNT_ITEMS":[
//     {"ITEM_CODE":"WUSUB","SEND_CODE":"EM","QTY_REQUESTED":"1","WAREHOUSE":"CIS","USER_ID":"WEB","REQUESTED_FLAG":"Y"}
// ]
// }