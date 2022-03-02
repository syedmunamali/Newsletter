const express = require("express");

const app = express();

const request = require("request");

const bodyParser = require("body-parser");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_field: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/839de20a91";

  const options = {
    method: "POST",
    auth: "shah125:37452e0fe05da8f8909d34126a1d345b-us14"
  }

const request = https.request(url, options, function(response){

  if (response.statusCode === 200) {
    res.sendFile(__dirname + "/success,html");
  }
  else {
    res.sendFile(__dirname + "/failure.html");
  }
  response.on("data", function(data){
    console.log(JSON.parse(data));
  });
});

request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(3000,
  function() {
    console.log("Server strated at port 3000");
  });


// 37452e0fe05da8f8909d34126a1d345b-us14
// 839de20a91.
