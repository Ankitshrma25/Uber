const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware'); // Add this line

router.post('/create', 
    body('userId').isString().isLength({ min: 24, max: 24 }).withMessage('Invalid user ID'),
    body('pickup').isString().isLength({ min: 3 }).withMessage('Pickup location is required'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Dropoff location is required'),
    body('vehicleType').isString().isIn(['auto', 'car', 'motorcycle']).withMessage('Invalid vehicle type'),
    rideController.createRide
);


router.get('/get-fare', 
    authMiddleware.authUser,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Pickup location is required'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Dropoff location is required'),
    rideController.getFare
);


router.post('/confirm',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride Id'),
    rideController.confirmRide
)

module.exports = router;
