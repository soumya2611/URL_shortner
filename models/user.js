const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    shortURL: {
        type: String,
        required: true,
        unique: true
    },
    redirectedURL: {
        type: String,
        required: true
    }
});
const User = mongoose.model('User',userSchema);
module.exports = User;