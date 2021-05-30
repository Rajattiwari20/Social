const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

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
    },

    avatar : {
        type : String,
    }

}, {
    timestamps : true
})

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..' , AVATAR_PATH))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  })
  
// static methods
user_schema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
user_schema.statics.avatarPath = AVATAR_PATH; 


const User = mongoose.model('User' , user_schema);

module.exports = User;  