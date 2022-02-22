const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    phone: String
});

const userModel = mongoose.model("user", userSchema, "user");

module.exports = userModel