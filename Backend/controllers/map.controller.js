const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');


module.exports.getCoordinates = async (req, res) => {
    // Validate request parameters
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { address } = req.query;
        if (!address) {
            return res.status(400).json({ message: 'Address is required' });
        }

        const coordinates = await mapService.getAddressCoordinate(address);
        return res.status(200).json(coordinates);
    } catch (error) {
        console.error('Error getting coordinates:', error.message);
        return res.status(404).json({ message: 'Coordinates not found' });
    }
};


module.exports.getDistanceAndTime = async (req, res) => {
    // Validate request parameters
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { origin, destination } = req.query;
        if (!origin || !destination) {
            return res.status(400).json({ message: 'Origin and destination are required' });
        }

        const distanceAndTime = await mapService.getDistanceAndTime(origin, destination);
        return res.status(200).json(distanceAndTime);
    } catch (error) {
        console.error('Error getting distance and time:', error.message);
        return res.status(404).json({ message: 'Distance and time not found' });
    }
}