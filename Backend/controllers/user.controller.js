const userModule = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModule = require('../models/blacklistToken.model');


module.exports.registerUser = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // console.log(req.body);

    const { fullname, email, password } = req.body;

    const isUserAlreadyExist = await userModule.findOne({
        email
    });

    if (isUserAlreadyExist) {
        return res.status(409).json({ message: 'User already exists' });
    }
    
    const hashPassword = await userModule.hashPassword(password);

    try {
        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashPassword
        });

        const token = user.generateAuthToken();

        res.status(201).json({ token, user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }


}



module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        const user = await userModule.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = user.generateAuthToken();

        res.cookie('token', token);

        res.status(200).json({ token, user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }   

}


module.exports.getUserProfile = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'User profile not found' });
    }
    res.status(200).json({ user: req.user });
}


module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null);
    // console.log("Token recieved:", token);

    await blacklistTokenModule.create({ token

    });
    res.status(200).json({ message: 'User logged out successfully' });
}