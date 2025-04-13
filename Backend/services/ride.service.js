const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

async function getFare(pickup, destination) {
    
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }
    // Check if pickup and destination are valid addresses

    const distanceAndTime = await mapService.getDistanceAndTime(pickup, destination);

    // Base rates for different vehicle types
    const rates = {
        auto: { base: 30, perKm: 15, perMin: 2 },
        car: { base: 50, perKm: 20, perMin: 3 },
        motorcycle: { base: 20, perKm: 12, perMin: 1.5 }
    };

    const fares = {};
    for (const vehicle in rates) {
        const rate = rates[vehicle];
        const fare = rate.base + 
            ((distanceAndTime.distance.value / 1000) * rate.perKm) + 
            ((distanceAndTime.duration.value / 60) * rate.perMin);
        fares[vehicle] = Math.round(fare);
    }

    return fares;

}


function getOTP(num) {
    return parseInt(
        crypto.randomInt(
            Math.pow(10, num - 1), 
            Math.pow(10, num)
        )
    );
}

module.exports.createRide = async ({
    user, pickup, destination, vehicleType

}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('User, pickup, destination, and vehicle type are required');
    }

    const fare = await getFare(pickup, destination);

    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: getOTP(6),
        fare: fare[vehicleType],
    });

    return  ride;
}


