const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModule = require('../models/captain.model');


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null);
    // console.log("Token recieved:", token);
    // This line checks if the token is stored in the cookie or in the Authorization header
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
    
    if (isBlacklisted) {
        console.log("Token is blacklisted");
        return res.status(401).json({ message: 'Unauthorized - token blacklisted' });
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);
        const user = await userModel.findById(decoded._id);
        console.log("User found in db:", user);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        req.user = user;

        return next();
    } catch (error) {
        console.log("Auth Middleware Error:", error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
}


module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null);
    // console.log("Token recieved:", token);
    // This line checks if the token is stored in the cookie or in the Authorization header
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
    
    if (isBlacklisted) {
        console.log("Token is blacklisted");
        return res.status(401).json({ message: 'Unauthorized - token blacklisted' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded Token:", decoded);
        const captain = await captainModule.findById(decoded._id);
        // console.log("Captain found in db:", captain);

        if (!captain) {
            return res.status(401).json({ message: 'Captain not found' });
        }
        req.captain = captain;

        return next();
    }
    catch (error) {
        console.log("Auth Middleware Error:", error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
}