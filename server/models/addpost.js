const mongoose = require('mongoose')

const postScheme = mongoose.Schema({
    postimage: String,
    postname: String,
    postcaption: String
})

const postModel = mongoose.model("post", postScheme, "post")

module.exports = postModel