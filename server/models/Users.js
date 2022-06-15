const mongoose = require('mongoose');

const {Schema} = mongoose;
const bcrypt = require ('bcryptjs');

const UsersSchema = new Schema({
    tipo : {
        type:String,
        require: true,
        trim:true
    },
    name : {
        type:String,
        require: true,
        trim:true
    },
    email : {
        type:String,
        require: true,
        trim:true,
        unique:true
    },
    password: {
        type:String,
        require: true,
        trim:true
    }
});

module.exports = mongoose.model('Users', UsersSchema);