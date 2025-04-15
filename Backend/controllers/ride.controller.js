const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket'); // Fix: Correct destructuring syntax

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination, vehicleType } = req.body;

    try {
        const ride = await rideService.createRide({
            user: userId,
            pickup,
            destination,
            vehicleType
        });
        res.status(201).json(ride);

        const pickupCoordinates = await mapService.getAdressCoordinate(pickup);
        console.log(pickupCoordinates)

        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 5000);
        
        ride.otp = ""

        captainsInRadius.map(async captain => {
            console.log(captain, ride);
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: ride
            })
        });

    } catch (error) {
        console.error('Error creating ride:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
    
};


module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.body;

    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (error) {
        console.error('Error fetching fare:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
}