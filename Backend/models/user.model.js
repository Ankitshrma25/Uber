const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlenght: [3, 'First name must be at least 3 characters long']
        },
        lastname: {
            type: String,
            minlenght: [3, 'Last name must be at least 3 characters long']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlenght: [5, 'Email must be at least 3 characters long']
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },

});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
};  // This method generates a token for the user

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};  // This method compares the password entered by the user with the password stored in the database

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};  // This method hashes the password entered by the user before storing it in the database

const userModule = mongoose.model('user', userSchema);


module.exports = userModule;