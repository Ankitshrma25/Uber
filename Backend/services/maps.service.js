const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
    try {
        // Replace GOOGLE_MAPS_API_KEY with your actual API key
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const encodedAddress = encodeURIComponent(address);
        
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`
        );

        if (response.data.status === 'OK') {
            const { lat, lng } = response.data.results[0].geometry.location;
            return {
                latitude: lat,
                longitude: lng
            };
        } else {
            throw new Error('Could not find coordinates for the given address');
        }
    } catch (error) {
        console.error('Error getting coordinates:', error.message);
        throw error;
    }
}

module.exports.getDistanceAndTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try{
        
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const element = response.data.rows[0].elements[0];
            if (element.status === 'OK') {
                return {
                    distance: element.distance.text,
                    duration: element.duration.text
                };
            } else {
                throw new Error('Could not find distance and time for the given locations');
            }
        } else {
            throw new Error('Error fetching data from Google Maps API');
        }

    }catch(error){
        console.error('Error getting distance and time:', error.message);
        throw error;
    }
}


module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input){
        throw new Error('query is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try{
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions.map(prediction => prediction.description);
        } else {
            throw new Error('Error fetching data from Google Maps API');
        }
    }catch(error){
        console.error('Error getting suggestions:', error.message);
        throw error;
    }
}

module.exports.getCaptainsInTheradius = async (ltd, lng, radius) => {

    //Radius in KM
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, ltd], radius / 6371]
            }
        }
    }).select('name phoneNumber vehicleType location rating reviewsCount imageUrl');

    return captains;    

}
