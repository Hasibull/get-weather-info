const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

app.post('/', function(request, response) {
    const userId = 'e9b9175e39b78f04323811ffcb7ed434';
    const region = request.body.cityName;
    const units = 'metric';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + region + '&units=' + units + '&appid=' + userId;
    https.get(url, function(res) {
        res.on('data', function(data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            response.write('<div style="maring: 0; padding: 0;height: 100vh; width: 100vw; background-color: #4a4a4a; text-align: center;"><div style="width: 40%; padding: 20px; margin:0 auto; border: 10px inset yellow;"><p style="margin: 0; padding: 0; font-size: 25px; color: white;">The weather is currently ' + weatherData.weather[0].description + '</p>');
            response.write('<h1>The Tempreture at ' + region + ' is ' + weatherData.main.temp + '</h1></div></div>')
            response.send();
        })
    });
});

app.listen(3000, function() {
    console.log('Server is running on port 3000.');
});