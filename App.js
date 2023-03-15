const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const favicon = require('express-favicon');

const app = express();
app.use(favicon(__dirname + '/public/weather.png'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + 'public'));



app.get('/', function(req, res) {
  res.render('home');
});
// get the style.css
app.get('/css/style.css/', function(req, res) {
  res.sendFile(__dirname + "/public/css/style.css")
});

app.get('/index.js', function(req, res) {
  res.sendFile(__dirname + "/public/index.js")
});
app.get('/weather', function(req, res) {
  res.render('weather')
});

app.post('/weather', function(req, res) {
  const country = req.body.input;
  const apiKey ="cede0d7755a540882fcfcb121ea86b17" ;
  const url =`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}&units=metric`;

  https.get(url, function(response) {
    response.on("data", function(data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const desc = weatherData.weather[0].description;
      const country = weatherData.name;
      const img =`http://openweathermap.org/img/wn/${icon}@2x.png`;
      res.render('weather', {
        location: `${country}`,
        name:`the temp in ${country} is ${temp}`,
        desc: `${desc}`,
        img:`${img}`,
       })
    })
  })
});

app.listen(process.env.PORT|| 3002, function(req, res) {
  console.log("server is running in port 3002");
})
