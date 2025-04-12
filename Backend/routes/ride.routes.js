const express = require('express');
const router = express.Router();
const { body } = require('express-validator');


router.post('/create', 
    body('userId').isString().isLength({ min: 24, max: 24 }).withMessage('Invalid user ID'),
    body('pickup').isString().isLength({ min: 3 }).withMessage('Pickup location is required'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Dropoff location is required'),
);


module.exports = router;
