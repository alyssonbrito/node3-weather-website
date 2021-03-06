"use strict";

// core module
const path = require('path');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// npm module
const express = require('express');
const hbs = require('hbs');


const app = express();

// setup for heroku
const port = process.env.PORT || 3000;


const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// console.log('__dirname:', __dirname);
// console.log('__filename:', __filename);
// console.log('partialsPath:', partialsPath);

// set up
app.set('view engine', 'hbs'); //set up handlebar as view engine
app.set('views', viewsPath); //custom views path
hbs.registerPartials(partialsPath);

// firulas
//app.disable('x-powered-by');
app.use(function(req, res, next) {
    res.header("x-powered-by", "Tucuma, Tapioca, and Jaba.");
    next();
});


// EXPRESS: set up static directory
app.use(express.static(publicDir));


app.get('', (req, res) => {
    res.render('index', { // render: uses the view engine
        title: 'Weather', // variable sent to the render engine
        name: 'Alysson Brito' // variable sent to the render engine
    });
});

// app.get('/about', (req, res) => {
//     res.send('<h1>I am a h1</h1>');
// });

app.get('/about', (req, res) => {
    res.render('about', { // render: uses the view engine
        title: 'About', // variable sent to the render engine
        name: 'Alysson Brito' // variable sent to the render engine
    });

});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Helping everyone',
        helpTextMessage: 'Mancha',
        name: 'Alysson Brito' // variable sent to the render engine
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
                forecast: forecastdata.summary + ' ' + forecastdata.summaryExtra,
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
            error: 'You must provide a search term'
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

// see port definition above
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});