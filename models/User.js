const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({

    name : {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true
    },
    profile_pic: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: false
    }, 
    website:{
        type:String,
        required:false
    },
    phone:{
        type: String,
        required: false
    },
    acc_privacy:{
        type: String
    },
    date : {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('user',UserSchema)