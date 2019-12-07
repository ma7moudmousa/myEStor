const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    }
    , lastName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String
        , required: true
    },
    phoneNum: {
        type: Number
    },
    password: {
        type: String
        , required: true
    },
    isAdmin: {
        type: Boolean
        , default: false
    }
})
userSchema.methods.genToken = function () {
    return jwt.sign({ id: this._id, email: this.email, isadmin: this.isAdmin, firstname: this.firstName }, 'mysecretkey');
}
const User = mongoose.model('user', userSchema);
module.exports = User;