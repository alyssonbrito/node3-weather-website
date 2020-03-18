const request = require('request');


const geocode = (address, callback) => {
    console.log('[geocode] start');
    // dynamic url
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWx5c3NvbmJyaXRvIiwiYSI6ImNrNTFnZHpvYjA5NjIzbHA4NHp5OXIxcm4ifQ.sGtHl7A_Bzqbklw5oI3DpQ&language=es&limit=1';

    // make request
    request({url:url, json:true}, (error, response) => {
	console.log('[geocode] api response');
	if (error) {
	    callback('Unable to caonnect to location services!', undefined);
	}else if (response.body.features.length === 0) {
	    callback('Unable to find location. Try another search.', undefined);
	}else{
	    locationData = response.body.features[0];
	    callback(null, {
		latitude: locationData.center[1],
		longitude: locationData.center[0],
		location: locationData.place_name
	    });
	}
    });

};

module.exports = geocode;
