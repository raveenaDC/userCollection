
const mongoose = require('mongoose')
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    address:
    {
        state: {
            type: String
        },
        city: {
            type: String
        }
    }


})
module.exports = mongoose.model('register', userSchema)