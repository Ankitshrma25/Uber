const { validationResult } = require('express-validator');
const captainModule = require('../models/captain.model');
const captainService = require('../services/captain.service');
const blacklistTokenModel = require('../models/blacklistToken.model');


module.exports.registerCaptain = async (req, res, next) => {
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        const { fullname, email, password, vehicle } = req.body;

        const isCaptainAlreadyExist = await captainModule.findOne({
            email
        });

        if (isCaptainAlreadyExist) {
            return res.status(409).json({ message: 'Captain already exists' });
        }
    
        const hashPassword = await captainModule.hashPassword(password);
    
        try {
            const captain = await captainService.registerCaptain({
                firstname: fullname.firstname,
                lastname: fullname.lastname,
                email,
                password: hashPassword,
                color: vehicle.color,
                plateNumber: vehicle.plateNumber,
                capacity: vehicle.capacity,
                vehicleType: vehicle.vehicleType

            });
    
            const token = captain.generateAuthToken();
    
            res.status(201).json({ token, captain });
    
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        const captain = await captainModule.findOne({ email }).select('+password');

        if (!captain) {
            return res.status(404).json({ message: 'Captain not found' });
        }

        const isMatch = await captain.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = captain.generateAuthToken();

        res.cookie('token', token);

        res.status(200).json({ token, captain });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
}  

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null);

    await blacklistTokenModel.create({ token });
    
    
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
}