const express = require("express");
const app = express();
const request = require("request");
const https =  require("https");
const bodyParser = require("body-parser");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
// route, call back function
app.get("/",function(req, res){
  res.sendFile(__dirname + "/signup.html")
})
app.post("/",function(req,res){
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data ={
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }
  const jsonData = JSON.stringify(data);
  const url = "https://us1.api.mailchimp.com/3.0/lists/c259e9540f";
  const options = {
    method: "POST",
    auth: "sanjay:3b7c7cbcd1737fa91e636291f087957f-us1"
  }
  const request = https.request(url, options, function(response){
    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req, res){
  res.redirect("/");
})
app.listen(process.env.PORT || 3000, function(){
  console.log("server is running at port 3000.");
})

//api keay
//3b7c7cbcd1737fa91e636291f087957f-us1
//list_id or audience // IDEA:
//c259e9540f
