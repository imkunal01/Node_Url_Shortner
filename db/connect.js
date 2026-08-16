const mongoose = require('mongoose');


// make sure to pass the MongoDB connection string as a parameter when calling this function
// it should be a string, for example: 'mongodb://localhost:27017/mydatabase'
async function connectDB(url) {

    try {
        await mongoose.connect(url);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
}

module.exports = connectDB;