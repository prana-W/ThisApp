const mongoose = require('mongoose');
require('dotenv').config();

const mongodbConnection = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB successfully!');

    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

module.exports = mongodbConnection;