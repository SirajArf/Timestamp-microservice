// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

let result ={};

app.get('/api/:timestring', (req, res) => {
  let string = req.params.timestring;
  console.log(typeof string)
  if(string.includes('-')){
    result['unix'] = new Date(string).getTime();
    result['utc'] = new Date(string).toUTCString();
  }else{
    input = parseInt(string);
    result['unix'] = new Date(input).getTime();
    result['utc'] = new Date(input).toUTCString();
  }



  if(!result['unix'] || !result['utc']){
    res.json({error: "Invalid Date"})
  }
    res.json(result);
  
})

// app.get('/api/:timestring', (req, res) => {
//   let string = req.params.timestring;
//   console.log(string)
//   if(string.match(/\d{5,}/)){
//     string = +string;
    
//   }
//   console.log(string);
//   let date = new Date(string);
//   console.log(date);

//   if(date.toUTCString() == "Invalid Date"){
//     res.json({error: date.toUTCString()})
//   }
//   res.json({unix: date.getTime(), utc: date.toUTCString()})
 
// })

app.get('/api/', (req, res) => {
  console.log(" in this route")
  console.log(new Date().getTime())
  result['unix'] = new Date().getTime();
  console.log("1")
  result['utc'] = new Date().toUTCString();
  res.json(result)
})



// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
