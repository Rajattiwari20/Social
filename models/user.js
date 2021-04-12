const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({

    email : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true,
    }, 

    userName : {
        type : String,
        required : true,
        unique : true
    }

}, {
    timestamps : true
})

const User = mongoose.model('User' , user_schema);

module.exports = User;