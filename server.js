const express = require('express')
const app = express();

const mongoose = require('mongoose');
const db = require('./db');
const userRoutes = require('./routes/userRoutes')
app.use('/', userRoutes);
app.listen(3000, () => {
    console.log('server running ')
})
