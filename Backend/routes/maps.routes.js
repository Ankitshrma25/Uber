const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const  mapController  = require('../controllers/map.controller');  
const { query } = require('express-validator');


// Middleware to check authentication

// Route to get coordinates from address
router.get('/get-coordinates',
    query('address').isString().isLength({ min: 3 }),
    authMiddleware.authUser, 
    mapController.getCoordinates
);

router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authMiddleware.authUser, 
    mapController.getDistanceAndTime
);

router.get('/get-suggestion',
    query('input').isString().isLength({ min: 3 }),
    authMiddleware.authUser, 
    mapController.getAutoCompleteSuggestions
);



module.exports = router;