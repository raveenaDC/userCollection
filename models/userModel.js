
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
    password: {
        type: String
    },
    userName: {
        type: String
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