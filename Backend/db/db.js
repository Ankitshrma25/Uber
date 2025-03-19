const mongoose = require('mongoose');


function connectToDb() {
    mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to MongoDB');
    }).catch((error) => {
        console.log('Error connecting to MongoDB:', error);
    });
}


module.exports = connectToDb;