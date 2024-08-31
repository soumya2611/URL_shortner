const mongoose = require('mongoose');
require('dotenv').config();
//const mongoURL = process.env.MONGODB_URL_LOCAL
const mongoURL = process.env.MONGODB_URL_COMPASS
//Connection setUp
mongoose.connect(mongoURL);
//Get the defalut connection
 const db = mongoose.connection;
db.on('connected', () => {
    console.log('connected to  mongo server');
});
db.on('error', (err) => {
    console.log('connection error', err)
});  
db.on('disconnected', () => {
    console.log('mongo disconnected');
});


module.exports = db;