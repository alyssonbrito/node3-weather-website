const request = require('request');

const forecast = (latitude, longitude, callback) => {
    console.log("[forecast]");
    if (!latitude || !longitude) {
        callback('Invalid parameters');
        return;
    }
    const url = 'https://api.darksky.net/forecast/4c22fa5c89b8ba0053908e87c6ae1937/' + latitude + ',' + longitude + '?units=si&lang=pt';
    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            console.log("ERROR: ", error);
            callback('Some low level error...')
        } else if (response.error) {
            callback('Error response. Code:' + response.code);
        } else {
            const data = response.body;
            const today = data.daily.data[0];
            const highDate = new Date(today.temperatureHighTime);
            callback(undefined, {
                maxTemperature: today.temperatureMax,
                maxHour: highDate.getHours(),
                maxMinute: highDate.getMinutes(),
                temperature: response.body.currently.temperature,
                summary: today.summary,
                precipProbability: today.precipProbability,
            });
        }
    });
};

module.exports = forecast;