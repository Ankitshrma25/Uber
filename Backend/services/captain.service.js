const captainModule = require('../models/captain.model');



module.exports.registerCaptain = async ({
    firstname, lastname, email, password,
    color, plateNumber, capacity, vehicleType
}) => {
    if (!firstname || !email || !password || !color || !plateNumber || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }
    const captain = captainModule.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plateNumber,
            capacity,
            vehicleType
        }
    });

    return captain;

}