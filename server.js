const express = require('express')
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const db = require('./db');
const userRoutes = require('./routes/userRoutes')
app.use('/', userRoutes);
PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('server running ')
})
