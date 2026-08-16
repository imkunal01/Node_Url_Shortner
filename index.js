const express = require('express');
const urlRoutes = require('./routes/urlRoutes');
const connectDB = require('./db/connect');
const app = express();
app.use(express.json());
app.use('/api/url', urlRoutes);

require('dotenv').config();

// mongo url shold be string 


// Connect to MongoDB
connectDB(  process.env.MONGO_URL);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});