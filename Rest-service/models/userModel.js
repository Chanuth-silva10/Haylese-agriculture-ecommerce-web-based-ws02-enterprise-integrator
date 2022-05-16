const mongoose = require('mongoose');
const schema = mongoose.Schema;

// create schema
const userSchema = new schema({
    id: {
        type: String
    },
    firstName: {
        type: String
    },    
    lastName: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    address:{
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    type: {
        type: String
    }
});

module.exports = user = mongoose.model('user',userSchema);