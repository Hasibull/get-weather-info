const express = require('express');
const https = require('https');

const app = express();

app.get('/', function(request, response) {
    const userId = 'e9b9175e39b78f04323811ffcb7ed434';
    const region = 'London';
    const units = 'metric';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + region + '&units=' + units + '&appid=' + userId;
    https.get(url, function(res) {
        res.on('data', function(data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            response.send('The tempreture is = ' + weatherData.main.temp);
        })
    });
});

app.listen(3000, function() {
    console.log('Server is running on port 3000.');
});