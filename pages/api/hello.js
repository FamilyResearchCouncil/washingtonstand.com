// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

//https://sheets.googleapis.com/v4/spreadsheets/1leK-43v3j6f7vUbQwEzO1C57Omygr6IHpJvykEOQd7Q/values/LaterTermAbortions?alt=json&key=
//process.env.DB_HOST

export default async function handler(req, res) {
  let data = {}
  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1leK-43v3j6f7vUbQwEzO1C57Omygr6IHpJvykEOQd7Q/values/LaterTermAbortions?alt=json&key=${process.env.GOOGLE_API_KEY}`)
      .then(res => res.json())
      .then(
          (result) => {
            data = result;
            // data.key = process.env.GOOGLE_API_KEY;
            // res.status(200).json(data);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            console.log(error);
            // setIsLoaded(true);
            // setError(error.message);
          }
      );


  res.status(200).json(data);
}
