"use strict";

// core module
const path = require('path');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// npm module
const express = require('express');
const hbs = require('hbs');


const app = express();
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

console.log('partialsPath:partialsPath', partialsPath);
console.log('__dirname:', __dirname);
console.log('__filename:', __filename);

// set up
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// EXPRESS: set up static directoty
app.use(express.static(publicDir));


app.get('', (req, res) => {
    res.render('index', { // render: uses the view engine
        title: 'Weather', // variable sent to the render engine
        name: 'I am a low name' // variable sent to the render engine
    });
});

// app.get('/about', (req, res) => {
//     res.send('<h1>I am a h1</h1>');
// });

app.get('/about', (req, res) => {
    res.render('about', { // render: uses the view engine
        title: 'About', // variable sent to the render engine
        name: 'Ze Droguinha' // variable sent to the render engine
    });

});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Helping everyone',
        helpTextMessage: 'Mancha',
        name: 'Ze Droguinha' // variable sent to the render engine
    });
});

app.get('/user', (req, res) => {
    res.send('Got a PUT request at /user')
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Must provide an address'
        });
    }
    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        console.log('[geocode] target:', req.query.address);
        console.log('Error: ', error);
        console.log('Data.location: ', location);
        if (error) {
            return res.send({
                error: 'Could not find address'
            });
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({
                    error: 'Could not get forecast'
                });
            }
            console.log('[forecast] target:', req.query.address);
            console.log('Error: ', error);
            console.log('Data: ', forecastdata);
            res.send({
                forecast: forecastdata.summary,
                location: location,
                address: req.query.address
            });
        });

    });

});

app.get('/products', (req, res) => {
    console.log('[Products]', req.query);
    console.log('[Products]', req.query.search);

    if (!req.query.search) {
        return res.send({
            error: 'Must provide a search term'
        });
    }

    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Page not found",
        name: "The great",
        errorMessage: "Article not found"
    });
});


app.get('*', (req, res) => {
    res.render('404', {
        title: "Page not found",
        name: "The great",
        errorMassage: "404 Page not found"
    });
});


//app.com
//app.com/help
//app.com/about

// to load express in port 3000
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});